export default function Card(props) {
  const { card, onCardClick } = props;
  const { name, link, isLiked } = card;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />

      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Me gusta"
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_is-active" : ""
          }`}
        />
      </div>
    </li>
  );
}
