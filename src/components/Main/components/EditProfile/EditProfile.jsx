export default function EditProfile() {
  return (
    <form className="popup__form" id="edit-profile-form" noValidate>
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
        />
        <span className="popup__error" id="profile-description-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
