export default function EditAvatar() {
  return (
    <form className="popup__form" id="avatar-form" noValidate>
      <label className="popup__field">
        <input
          id="avatar-link"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace a la imagen"
          required
          type="url"
        />
        <span className="popup__error" id="avatar-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
