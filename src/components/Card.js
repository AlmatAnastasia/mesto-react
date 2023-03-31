export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    } 
    return(
        <li className="card" key={`${props.card._id}`}>
            <img className="card__image indicator" src={`${props.card.link}`} alt="Фотография места" onClick={handleClick}/>
            <div className="card__item">
                <h2 className="card__item-title much-text">{props.card.name}</h2>
                <div className="card__item-like-container">
                    <button type="button" name="like-button" aria-label="Кнопка &quot;Лайк&quot;"
                    className="card__item-like-button indicator"></button>
                    <label type="text" name="like-number" className="card__item-like-number">{props.card.likes.length}</label>
                </div>
            </div>
            <button type="button" name="delete-button" aria-label="Кнопка &quot;Удалить&quot;"
            className="card__delete-button indicator"></button>
        </li>
    );
}