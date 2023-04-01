export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <li className="card">
      <img
        className="card__image indicator"
        src={`${card.link}`}
        alt="Фотография места"
        onClick={handleClick}
      />
      <div className="card__item">
        <h2 className="card__item-title much-text">{card.name}</h2>
        <div className="card__item-like-container">
          <button
            type="button"
            name="like-button"
            aria-label='Кнопка "Лайк"'
            className="card__item-like-button indicator"
          ></button>
          <label
            type="text"
            name="like-number"
            className="card__item-like-number"
          >
            {card.likes.length}
          </label>
        </div>
      </div>
      <button
        type="button"
        name="delete-button"
        aria-label='Кнопка "Удалить"'
        className="card__delete-button indicator"
      ></button>
    </li>
  );
}
