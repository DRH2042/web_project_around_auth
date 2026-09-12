import useFormValidation from "../../../../hooks/useFormValidation.js";

export default function NewCard({ onAddPlaceSubmit }) {
  const { values, errors, isValid, handleChange } = useFormValidation({
    name: "",
    link: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onAddPlaceSubmit({ name: values.name, link: values.link });
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className={`popup__input popup__input_type_card-name ${
            errors.name ? "popup__input_type_error" : ""
          }`}
          id="card-name"
          maxLength="30"
          minLength="2"
          name="name"
          placeholder="Título"
          required
          type="text"
          value={values.name || ""}
          onBlur={handleChange}
          onChange={handleChange}
        />
        <span className="popup__error" id="card-name-error">
          {errors.name}
        </span>
      </label>

      <label className="popup__field">
        <input
          className={`popup__input popup__input_type_url ${
            errors.link ? "popup__input_type_error" : ""
          }`}
          id="card-link"
          name="link"
          placeholder="Enlace a la imagen"
          required
          type="url"
          value={values.link || ""}
          onBlur={handleChange}
          onChange={handleChange}
        />
        <span className="popup__error" id="card-link-error">
          {errors.link}
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
