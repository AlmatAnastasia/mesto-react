export default function PopupWithForm({
  name,
  title,
  textButton,
  isOpen,
  onClose,
  children,
}) {
  const popupClassList = `popup popup_type_${name} ${isOpen && "popup_opened"}`;
  return (
    <div className={popupClassList}>
      <div className="popup__container">
        <form
          name={`popup-form_type_${name}`}
          className="popup__form"
          noValidate
        >
          <h3 className="popup__heading">{title}</h3>
          {children}
          <button
            type="submit"
            name="submit"
            aria-label={`Кнопка отправки формы &quot;${textButton}&quot;`}
            className="popup__submit indicator"
          >
            {textButton}
          </button>
        </form>
        <button
          type="button"
          name="close-button"
          aria-label='Кнопка "Закрыть"'
          className="popup__close-button indicator"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}