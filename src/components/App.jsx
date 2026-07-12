import { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => console.error(error));

    api
      .getCardList()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => console.error(error));
  }, []);

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
        <Header />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
