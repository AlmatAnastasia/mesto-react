import React from "react";
import Card from './Card.js';
import api from '../utils/api.js';
import headerLogo from '../images/header-logo.svg';

export default function Main(props) {
    React.useEffect(()=>{
        const elementPopupEditButton = document.querySelector('.profile__intro-edit-button');
        const elementPopupNewCardButton = document.querySelector('.profile__add-button');
        const elementPopupUpdateAvatarButton = document.querySelector('.profile__avatar-edit-button');

        elementPopupEditButton.addEventListener('click', props.onEditPopup);
        elementPopupNewCardButton.addEventListener('click', props.onNewCardPopup);
        elementPopupUpdateAvatarButton.addEventListener('click', props.onUpdateAvatarPopup);
    }, []);

    const [cards, setCards] = React.useState([]);
    React.useEffect(()=>{
        api.getInitialCards()
        .then((cards => {
            setCards(cards);
        }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
    }, []);


    return(
        <main className="main">

            {/* Блок 2 profile */}
            <section className="profile">
                <button type="button" name="edit-button" aria-label="Кнопка &quot;Редактировать&quot;"
                    className="profile__avatar-edit-button indicator">
                    <img className="profile__avatar" src={`${props.userAvatar}`} alt="Изображение &quot;Аватар профиля&quot;" />
                </button>
                <div className="profile__intro">
                    <h1 className="profile__intro-title much-text">{props.userName}</h1>
                    <button type="button" name="edit-button" aria-label="Кнопка &quot;Редактировать&quot;"
                        className="profile__intro-edit-button indicator"></button>
                    <p className="profile__intro-text much-text">{props.userDescription}</p>
                </div>
                <button type="button" name="add-button" aria-label="Кнопка &quot;Добавить&quot;"
                    className="profile__add-button indicator"></button>
            </section>

            {/* Блок 3 cards */}
            <section className="cards">
                <ul className="cards__list list">
                {cards.map((card, i) => (
                    <Card 
                    card={card}
                    onCardClick={props.onCardClick}
                    />
                ))}
                </ul>
            </section>

        </main>
    );
}