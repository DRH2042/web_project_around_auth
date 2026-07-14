import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";
import useFormValidation from "../../../../hooks/useFormValidation.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange } = useFormValidation(
    {
      name: currentUser.name || "",
      description: currentUser.about || "",
    },
    Boolean(currentUser.name && currentUser.about)
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    handleUpdateUser({ name: values.name, about: values.description });
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
          className={`popup__input popup__input_type_name ${
            errors.name ? "popup__input_type_error" : ""
          }`}
          name="name"
          placeholder="Nombre"
          type="text"
          required
          minLength="2"
          maxLength="40"
          value={values.name || ""}
          onBlur={handleChange}
          onChange={handleChange}
        />
        <span className="popup__error" id="profile-name-error">
          {errors.name}
        </span>
      </label>

      <label className="popup__field">
        <input
          id="profile-description"
          className={`popup__input popup__input_type_description ${
            errors.description ? "popup__input_type_error" : ""
          }`}
          name="description"
          placeholder="Acerca de mí"
          type="text"
          required
          minLength="2"
          maxLength="200"
          value={values.description || ""}
          onBlur={handleChange}
          onChange={handleChange}
        />
        <span className="popup__error" id="profile-description-error">
          {errors.description}
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
