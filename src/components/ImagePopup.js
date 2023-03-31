import React from 'react';

export default function ImagePopup(props){
    const popupClassList = props.onOpen === props.name 
        ? `popup popup_type_${props.name} popup_opened`
        :`popup popup_type_${props.name}`;
    return(
    <div className={popupClassList}>
        <div className="popup__container popup__container_preview">
            <img className="popup__image indicator" src={`${props.link}`} alt="Превью" />
            <h3 className="popup__heading popup__heading_preview">{props.heading}</h3>
            <button type="button" name="close-button" aria-label="Кнопка &quot;Закрыть&quot;"
              className="popup__close-button indicator" onClick={props.onClose}></button>
        </div>
    </div>
    );
}