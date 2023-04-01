import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";

function App() {
  // переменные состояния
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = useState(false);
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isPopupImageOpen: false,
    link: "",
    heading: "",
  });
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    api
      .getProfileInfo()
      .then((info) => {
        const { name, about, avatar } = info;
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      });
  }, []);

  function handleEditPopupClick() {
    setIsEditPopupOpen(!isEditPopupOpen);
  }
  function handleNewCardPopupClick() {
    setIsNewCardPopupOpen(!isNewCardPopupOpen);
  }
  function handleUpdateAvatarPopupClick() {
    setIsUpdateAvatarPopupOpen(!isUpdateAvatarPopupOpen);
  }
  function handleCardClick(data) {
    const { link, name } = data;
    setSelectedCard({ isPopupImageOpen: true, link: link, heading: name });
  }
  function closeAllPopups() {
    setIsEditPopupOpen(false);
    setIsNewCardPopupOpen(false);
    setIsUpdateAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <Header />

      <Main
        onEditPopup={handleEditPopupClick}
        onNewCardPopup={handleNewCardPopupClick}
        onUpdateAvatarPopup={handleUpdateAvatarPopupClick}
        onCardClick={handleCardClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
      />

      <Footer />

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        textButton="Сохранить"
        isOpen={isEditPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__info">
          <div className="popup__cell">
            <input
              type="text"
              id="popup-edit-name-text"
              name="popup__input_type_name-text"
              className="popup__input popup__input_type_name-text"
              placeholder={userName ? `${userName}` : "Имя"}
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup-edit-name-text-error"></span>
          </div>
          <div className="popup__cell">
            <input
              type="text"
              id="popup-edit-description-text"
              name="popup__input_type_description-text"
              className="popup__input popup__input_type_description-text"
              placeholder={userDescription ? `${userDescription}` : "О себе"}
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup-edit-description-text-error"></span>
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="new-card"
        title="Новое место"
        textButton="Создать"
        isOpen={isNewCardPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__info">
          <div className="popup__cell">
            <input
              type="text"
              id="popup-new-card-name-text"
              name="popup__input_type_name-text"
              className="popup__input popup__input_type_name-text"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup-new-card-name-text-error"></span>
          </div>
          <div className="popup__cell">
            <input
              type="url"
              id="popup-new-card-description-url"
              name="popup__input_type_description-url"
              className="popup__input popup__input_type_description-url"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup-new-card-description-url-error"></span>
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        textButton="Да"
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name="update-avatar"
        title="Обновить аватар"
        textButton="Создать"
        isOpen={isUpdateAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__info">
          <div className="popup__cell">
            <input
              type="url"
              id="popup-update-avatar-description-url"
              name="popup__input_type_description-url"
              className="popup__input popup__input_type_description-url"
              placeholder="Ссылка на новое изображение аватара"
              required
            />
            <span className="popup-update-avatar-description-url-error"></span>
          </div>
        </fieldset>
      </PopupWithForm>

      <ImagePopup
        name="image"
        isOpen={selectedCard}
        onClose={closeAllPopups}
        heading={selectedCard.heading}
        link={selectedCard.link}
      />
    </div>
  );
}

export default App;