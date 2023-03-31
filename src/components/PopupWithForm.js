export default function PopupWithForm(props) {
    const popupClassList = props.onOpen === props.name 
        ? `popup popup_type_${props.name} popup_opened`
        :`popup popup_type_${props.name}`;
        console.log(props.onOpen);
    
    return(
        <>
            <div className={popupClassList}>
                <div className="popup__container">
                    <form name={`popup-form_type_${props.name}`} className="popup__form" noValidate>
                        <h3 className="popup__heading">{props.title}</h3>
                        {props.children}
                        <button type="submit" name="submit" aria-label={`Кнопка отправки формы &quot;${props.textButton}&quot;`}
                            className="popup__submit indicator">{props.textButton}</button>
                    </form>
                    <button type="button" name="close-button" aria-label="Кнопка &quot;Закрыть&quot;"
                        className="popup__close-button indicator" onClick={props.onClose}></button>
                </div>
            </div>
        </>
    );
}