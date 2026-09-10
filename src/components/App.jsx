import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

const TOKEN_KEY = "jwt";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [authEmail, setAuthEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_KEY))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tooltip, setTooltip] = useState({ isOpen: false, isSuccess: false });
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      return;
    }

    auth
      .getUserInfo(token)
      .then(({ data }) => {
        setAuthEmail(data.email);
        setLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setIsCheckingToken(false));
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => console.error(error));
  }, [loggedIn]);

  function handleRegister({ email, password }) {
    setIsSubmitting(true);
    auth
      .register(email, password)
      .then(() => setTooltip({ isOpen: true, isSuccess: true }))
      .catch((error) => {
        console.error(error);
        setTooltip({ isOpen: true, isSuccess: false });
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleLogin({ email, password }) {
    setIsSubmitting(true);
    auth
      .authorize(email, password)
      .then(({ token }) => {
        localStorage.setItem(TOKEN_KEY, token);
        setAuthEmail(email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setTooltip({ isOpen: true, isSuccess: false });
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setLoggedIn(false);
    setAuthEmail("");
    setCards([]);
    setCurrentUser({});
    setPopup(null);
    navigate("/signin", { replace: true });
  }

  function handleCloseTooltip() {
    const shouldGoToLogin = tooltip.isSuccess;
    setTooltip({ isOpen: false, isSuccess: false });

    if (shouldGoToLogin) {
      navigate("/signin");
    }
  }

  function handleOpenPopup(selectedPopup) {
    setPopup(selectedPopup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function getCardIsLiked(card) {
    return Boolean(
      card.likes?.some((user) => user._id === currentUser._id) || card.isLiked
    );
  }

  function handleCardLike(card) {
    const isLiked = getCardIsLiked(card);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateAvatar, handleUpdateUser }}
    >
      <div className="page__content">
        <Header
          email={authEmail}
          loggedIn={loggedIn}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                isLoading={isSubmitting}
                loggedIn={loggedIn}
                onRegister={handleRegister}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                isLoading={isSubmitting}
                loggedIn={loggedIn}
                onLogin={handleLogin}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                isCheckingToken={isCheckingToken}
                loggedIn={loggedIn}
              >
                <>
                  <Main
                    cards={cards}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    onClosePopup={handleClosePopup}
                    onOpenPopup={handleOpenPopup}
                    popup={popup}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <InfoTooltip
          isOpen={tooltip.isOpen}
          isSuccess={tooltip.isSuccess}
          onClose={handleCloseTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
