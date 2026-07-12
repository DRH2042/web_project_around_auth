import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function Card(props) {
  const { card, onCardClick, onCardDelete, onCardLike } = props;
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link } = card;
  const isLiked = Boolean(
    card.likes?.some((user) => user._id === currentUser._id) || card.isLiked
  );
  const isOwn = (card.owner?._id || card.owner) === currentUser._id;
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />

      {isOwn && (
        <button
          aria-label="Eliminar tarjeta"
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
        />
      )}

      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Me gusta"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
