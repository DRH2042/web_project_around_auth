import successIcon from "../../images/success.svg";
import errorIcon from "../../images/error.svg";

export default function InfoTooltip({ isOpen, isSuccess, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup popup_type_tooltip" onMouseDown={onClose}>
      <div className="popup__content tooltip" onMouseDown={(event) => event.stopPropagation()}>
        <button
          aria-label="Cerrar mensaje"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <img
          className="tooltip__icon"
          src={isSuccess ? successIcon : errorIcon}
          alt=""
        />
        <h2 className="tooltip__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h2>
      </div>
    </div>
  );
}
