export default function RemoveConfirmation({ onCancel, onConfirm }) {
  function handleSubmit(event) {
    event.preventDefault();
    onConfirm();
  }

  return (
    <form className="popup__form popup__form_type_confirmation" onSubmit={handleSubmit}>
      <button className="popup__button popup__button_type_confirm" type="submit">
        Sí
      </button>
      <button
        className="popup__cancel-button"
        type="button"
        onClick={onCancel}
      >
        No, cancelar
      </button>
    </form>
  );
}
