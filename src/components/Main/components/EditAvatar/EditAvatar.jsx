import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";
import useFormValidation from "../../../../hooks/useFormValidation.js";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();
  const { errors, isValid, handleChange } = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

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
          className={`popup__input popup__input_type_avatar ${
            errors.avatar ? "popup__input_type_error" : ""
          }`}
          name="avatar"
          placeholder="Enlace a la imagen"
          ref={avatarRef}
          required
          type="url"
          onBlur={handleChange}
          onChange={handleChange}
        />
        <span className="popup__error" id="avatar-link-error">
          {errors.avatar}
        </span>
      </label>

      <button
        className={`button popup__button ${
          !isValid ? "popup__button_disabled" : ""
        }`}
        disabled={!isValid}
        type="submit"
      >
        Guardar
      </button>
    </form>
  );
}
