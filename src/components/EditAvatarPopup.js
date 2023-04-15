import PopupWithForm from "./PopupWithForm";
export default function EditAvatarPopup({
  textButton,
  isOpen,
  onClose,
  onUpdateAvatar,
  // реф avatarRef
  avatarRef,
  // валидация
  setState,
  validity,
  handleFocus,
  handleInputChange,
  isButtonActive,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
    setState({
      inputValue: "",
      inputValidity: true,
      errorMessage: false,
    });
  }
  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      textButton={textButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      inputValidity={[validity.inputValidity]}
      isButtonActive={isButtonActive}
    >
      <fieldset className="popup__info">
        <div className="popup__cell">
          <input
            type="url"
            id="popup-update-avatar-description-url"
            name="popup__input_type_description-url"
            className={`popup__input popup__input_type_description-url ${
              !validity.inputValidity && "popup__input_type_error"
            }`}
            placeholder="Ссылка на новое изображение аватара"
            ref={avatarRef}
            value={validity.inputValue}
            onFocus={handleFocus(setState)}
            onChange={handleInputChange(setState)}
            required
          />
          <span
            className={`popup-update-avatar-description-url-error ${
              !validity.inputValidity && "popup__input-error"
            }`}
          >
            {validity.errorMessage}
          </span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}
