import { useEffect, useState } from "react";
import Card from "./Card.js";
import api from "../utils/api.js";

export default function Main({
  onEditPopup,
  onNewCardPopup,
  onUpdateAvatarPopup,
  onCardClick,
  userName,
  userDescription,
  userAvatar,
}) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      });
  }, []);

  return (
    <main className="main">
      {/* Блок 2 profile */}
      <section className="profile">
        <button
          type="button"
          name="edit-button"
          aria-label='Кнопка "Редактировать"'
          className="profile__avatar-edit-button indicator"
          onClick={onUpdateAvatarPopup}
        >
          <img
            className="profile__avatar"
            src={`${userAvatar}`}
            alt='Изображение "Аватар профиля"'
          />
        </button>
        <div className="profile__intro">
          <h1 className="profile__intro-title much-text">{userName}</h1>
          <button
            type="button"
            name="edit-button"
            aria-label='Кнопка "Редактировать"'
            className="profile__intro-edit-button indicator"
            onClick={onEditPopup}
          ></button>
          <p className="profile__intro-text much-text">{userDescription}</p>
        </div>
        <button
          type="button"
          name="add-button"
          aria-label='Кнопка "Добавить"'
          className="profile__add-button indicator"
          onClick={onNewCardPopup}
        ></button>
      </section>

      {/* Блок 3 cards */}
      <section className="cards">
        <ul className="cards__list list">
          {cards.map((card, i) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
