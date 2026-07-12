import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="avatar-link"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace a la imagen"
          ref={avatarRef}
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
