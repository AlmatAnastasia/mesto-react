import { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
export default function EditProfilePopup({
  textButton,
  isOpen,
  onClose,
  onUpdateUser,
  // управляемые компоненты name, description
  name,
  setName,
  description,
  setDescription,
  // валидация
  validityName,
  setStateName,
  validityDescription,
  setStateDescription,
  isButtonActive,
  setIsButtonActive,
}) {
  const currentUser = useContext(CurrentUserContext);
  // подписаться на изменения данных пользователя
  function handleChange(setState) {
    return (evt) => {
      const input = evt.target;
      const classList = input.className;
      classList.indexOf("popup__input_type_name-text") !== -1
        ? setName(input.value)
        : setDescription(input.value);
      // валидация (edit)
      setState({
        inputValue: input.value,
        inputValidity: input.validity.valid,
        errorMessage: input.validationMessage,
      });
      setIsButtonActive(true);
    };
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    // передать значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  // использовать данные текущего пользователя в управляемых компонентах
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, setName, setDescription]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
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
            id="popup-edit-name-text"
            name="popup__input_type_name-text"
            className={`popup__input popup__input_type_name-text ${
              !validityName.inputValidity && "popup__input_type_error"
            }`}
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleChange(setStateName)}
            required
          />
          <span
            className={`popup-edit-name-text-error ${
              !validityName.inputValidity && "popup__input-error"
            }`}
          >
            {validityName.errorMessage}
          </span>
        </div>
        <div className="popup__cell">
          <input
            type="text"
            id="popup-edit-description-text"
            name="popup__input_type_description-text"
            className={`popup__input popup__input_type_description-text ${
              !validityDescription.inputValidity && "popup__input_type_error"
            }`}
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleChange(setStateDescription)}
            required
          />
          <span
            className={`popup-edit-description-text-error ${
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
