import PopupWithForm from "./PopupWithForm";
export default function AddNewCardPopup({
  textButton,
  isOpen,
  onClose,
  onAddNewCard,
  // рефы nameRef, linkRef
  nameRef,
  linkRef,
  // валидация
  validityName,
  setStateName,
  validityDescription,
  setStateDescription,
  handleFocus,
  handleInputChange,
  isButtonActive,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddNewCard({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
    nameRef.current.value = "";
    linkRef.current.value = "";
  }
  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      textButton={textButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      inputValidity={[
        validityName.inputValidity,
        validityDescription.inputValidity,
      ]}
      isButtonActive={isButtonActive}
    >
      <fieldset className="popup__info">
        <div className="popup__cell">
          <input
            type="text"
            id="popup-new-card-name-text"
            name="popup__input_type_name-text"
            className={`popup__input popup__input_type_name-text ${
              !validityName.inputValidity && "popup__input_type_error"
            }`}
            placeholder="Название"
            minLength="2"
            maxLength="30"
            ref={nameRef}
            onFocus={handleFocus(setStateName)}
            onChange={handleInputChange(setStateName)}
            required
          />
          <span
            className={`popup-new-card-name-text-error ${
              !validityName.inputValidity && "popup__input-error"
            }`}
          >
            {validityName.errorMessage}
          </span>
        </div>
        <div className="popup__cell">
          <input
            type="url"
            id="popup-new-card-description-url"
            name="popup__input_type_description-url"
            className={`popup__input popup__input_type_description-url ${
              !validityDescription.inputValidity && "popup__input_type_error"
            }`}
            placeholder="Ссылка на картинку"
            ref={linkRef}
            onFocus={handleFocus(setStateDescription)}
            onChange={handleInputChange(setStateDescription)}
            required
          />
          <span
            className={`popup-new-card-description-url-error ${
              !validityDescription.inputValidity && "popup__input-error"
            }`}
          >
            {validityDescription.errorMessage}
          </span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}
