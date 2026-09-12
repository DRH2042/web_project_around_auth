import { useContext } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/NewCard/NewCard.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/EditAvatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";
import ImagePopup from "./components/ImagePopup/ImagePopup.jsx";
import RemoveConfirmation from "./components/RemoveConfirmation/RemoveConfirmation.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import avatar from "../../images/avatar.jpg";

function Main(props) {
  const {
    cards,
    onAddPlaceSubmit,
    onCardDelete,
    onCardLike,
    onClosePopup,
    onOpenPopup,
    popup,
  } = props;
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  function handleCardClick(card) {
    onOpenPopup({
      children: <ImagePopup card={card} />,
    });
  }

  function handleCardDeleteClick(card) {
    onOpenPopup({
      title: "¿Estás seguro/a?",
      children: (
        <RemoveConfirmation
          onCancel={onClosePopup}
          onConfirm={() => onCardDelete(card)}
        />
      ),
    });
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <img
          className="profile__image"
          src={currentUser.avatar || avatar}
          alt={currentUser.name || "Avatar"}
          onClick={() => onOpenPopup(editAvatarPopup)}
        />

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />
          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDeleteClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
