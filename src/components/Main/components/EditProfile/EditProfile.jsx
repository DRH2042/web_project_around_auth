import { useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name || "");
  const [description, setDescription] = useState(currentUser.about || "");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="profile-name"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Nombre"
          type="text"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="profile-name-error"></span>
      </label>

      <label className="popup__field">
        <input
          id="profile-description"
          className="popup__input popup__input_type_description"
          name="description"
          placeholder="Acerca de mí"
          type="text"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="profile-description-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
