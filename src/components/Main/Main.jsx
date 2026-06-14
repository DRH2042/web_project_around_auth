import { useState } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/NewCard/NewCard.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/EditAvatar/EditAvatar.jsx";

import avatar from "../../images/avatar.jpg";

function Main() {
  const [popup, setPopup] = useState(null);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  function handleOpenPopup(selectedPopup) {
    setPopup(selectedPopup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <img
          className="profile__image"
          src={avatar}
          alt="Avatar"
          onClick={() => handleOpenPopup(editAvatarPopup)}
        />

        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          />
          <p className="profile__description">Explorador</p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list"></ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
