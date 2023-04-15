import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupWithForm from "./PopupWithForm";
import AddNewCardPopup from "./AddNewCardPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  // рефы
  const nameRef = useRef("");
  const linkRef = useRef("");
  const avatarRef = useRef("");
  // переменные состояния
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = useState(false);
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isPopupImageOpen: false,
    link: "",
    heading: "",
  });
  const [renderLoadingDelete, setRenderLoadingDelete] = useState("Да");
  const [cardDelete, setcardDelete] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    about: "",
    avatar: "",
    isGetData: false,
  });
  const [cards, setCards] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [renderLoadingEdit, setRenderLoadingEdit] = useState("Сохранить");
  const [renderLoading, setRenderLoading] = useState("Создать");
  // переменные состояния (валидация)
  const [validityPopupEditInputName, setValidityPopupEditInputName] = useState({
    inputValue: "", // значение поля
    inputValidity: true, // валидность поля
    errorMessage: false, // текст ошибки
  });
  const [
    validityPopupEditInputDescription,
    setValidityPopupEditInputDescription,
  ] = useState({
    inputValue: "",
    inputValidity: true,
    errorMessage: false,
  });
  const [validityPopupNewCardInputName, setValidityPopupNewCardInputName] =
    useState({
      inputValue: "",
      inputValidity: true,
      errorMessage: false,
    });
  const [
    validityPopupNewCardInputDescription,
    setValidityPopupNewCardInputDescription,
  ] = useState({
    inputValue: "",
    inputValidity: true,
    errorMessage: false,
  });
  const [validityPopupUpdateAvatar, setValidityPopupUpdateAvatar] = useState({
    inputValue: "",
    inputValidity: true,
    errorMessage: false,
  });
  const [isButtonActive, setIsButtonActive] = useState(false);
  // валидация (avatar, new-card)
  function handleFocus(setState) {
    return (evt) => {
      const input = evt.target;
      setState({
        inputValue: input.value,
        inputValidity: false,
        errorMessage: false,
      });
    };
  }
  function handleInputChange(setState) {
    return (evt) => {
      const input = evt.target;
      setState({
        inputValue: input.value,
        inputValidity: input.validity.valid,
        errorMessage: input.validationMessage,
      });
      setIsButtonActive(true);
    };
  }
  // закрыть попап при нажатии на кнопку overlay
  function handleOverlayClose(evt) {
    const classList = evt.target.classList;
    if (classList.contains("popup")) {
      closeAllPopups();
    }
  }
  // закрыть попап клавишей Esc
  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }
  // открыть/закрыть попапы edit, new-card, avatar
  function handleEditPopupClick() {
    setIsEditPopupOpen(!isEditPopupOpen);
  }
  function handleNewCardPopupClick() {
    setIsNewCardPopupOpen(!isNewCardPopupOpen);
  }
  function handleUpdateAvatarPopupClick() {
    setIsUpdateAvatarPopupOpen(!isUpdateAvatarPopupOpen);
  }
  // открыть/закрыть попап image
  function handleCardClick(data) {
    const { link, name } = data;
    setSelectedCard({ isPopupImageOpen: true, link: link, heading: name });
  }
  // отправка попапа delete
  function handlePopupDeleteSubmit(evt) {
    evt.preventDefault();
    deleteOldCard(cardDelete);
  }
  // удалить карточку
  function handleCardDelete(card) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setIsButtonActive(true);
    if (isDeletePopupOpen) {
      setRenderLoadingDelete("Удаление...");
    }
    setcardDelete(card);
  }
  // закрыть все попапы
  function closeAllPopups() {
    setIsEditPopupOpen(false);
    setIsNewCardPopupOpen(false);
    setIsUpdateAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsDeletePopupOpen(false);
    // при закрытии попапа (edit) задать управляемым компонентам
    // текущие данные профиля
    setName(currentUser.name);
    setDescription(currentUser.about);
    // при закрытии попапа (avatar) очистить данные рефа
    avatarRef.current.value = "";
    // при закрытии попапа (new-card) очистить данные рефа
    nameRef.current.value = "";
    linkRef.current.value = "";
    // очистка полей (валидация)
    setValidityPopupEditInputName({
      inputValue: "",
      inputValidity: true,
      errorMessage: false,
    });
    setValidityPopupEditInputDescription({
      inputValue: "",
      inputValidity: true,
      errorMessage: false,
    });
    setValidityPopupNewCardInputName({
      inputValue: "",
      inputValidity: true,
      errorMessage: false,
    });
    setValidityPopupNewCardInputDescription({
      inputValue: "",
      inputValidity: true,
      errorMessage: false,
    });
    setValidityPopupUpdateAvatar({
      inputValue: "",
      inputValidity: true,
      errorMessage: false,
    });
    setIsButtonActive(false);
  }
  // Взаимодействие с сервером
  // добавить информацию о пользователе с сервера
  useEffect(() => {
    // эффект при монтировании
    api
      .getProfileInfo()
      .then((info) => {
        const { name, about, avatar, _id } = info;
        // обновление стейт-переменной
        setCurrentUser({
          id: _id,
          name: name,
          about: about,
          avatar: avatar,
          isGetData: true,
        });
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      });
  }, []);
  // загрузить карточки с сервера
  useEffect(() => {
    // эффект при монтировании
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
  // лайк/дизлайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);
    // отправить запрос в API и получить обновлённые данные карточки
    if (!isLiked) {
      api
        .updateAddStatusLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          // обработать ошибки
          console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
    } else {
      api
        .updateDeleteStatusLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          // обработать ошибки
          console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
    }
  }
  // удалить карточку
  function deleteOldCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      })
      .finally(() => {
        setRenderLoadingDelete("Да");
        setIsDeletePopupOpen(!isDeletePopupOpen);
      });
  }
  // изменить собственную информацию (данные профиля) на сервере
  function handleUpdateUser({ name, about }) {
    setRenderLoadingEdit("Сохранение...");
    api
      .editProfileInfo(name, about)
      .then((info) => {
        const { name, about, avatar, _id } = info;
        setCurrentUser({
          id: _id,
          name: name,
          about: about,
          avatar: avatar,
          isGetData: true,
        });
        setIsEditPopupOpen(!isEditPopupOpen);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      })
      .finally(() => {
        setRenderLoadingEdit("Сохранить");
      });
  }
  // добавить новую карточку на сервер
  function handleAddNewCard({ name, link }) {
    setRenderLoading("Создание...");
    api
      .addCard(name, link)
      .then((newCard) => {
        // расширенная копия текущего массива cards
        setCards([newCard, ...cards]);
        setIsNewCardPopupOpen(!isNewCardPopupOpen);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      })
      .finally(() => {
        setRenderLoading("Создать");
      });
  }
  // изменить собсвенную информацию (аватар пользователя)
  function handleUpdateAvatar({ avatar }) {
    setRenderLoading("Создание...");
    api
      .editProfileAvatar(avatar)
      .then((info) => {
        const { name, about, avatar, _id } = info;
        setCurrentUser({
          id: _id,
          name: name,
          about: about,
          avatar: avatar,
          isGetData: true,
        });
        setIsUpdateAvatarPopupOpen(!isUpdateAvatarPopupOpen);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      })
      .finally(() => {
        setRenderLoading("Создать");
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div
        className="page"
        onClick={handleOverlayClose}
        onKeyUp={handleEscClose}
      >
        <Header />

        <Main
          onEditPopup={handleEditPopupClick}
          onNewCardPopup={handleNewCardPopupClick}
          onUpdateAvatarPopup={handleUpdateAvatarPopupClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          setCards={setCards}
        />

        <Footer />

        <EditProfilePopup
          textButton={renderLoadingEdit}
          isOpen={isEditPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          validityName={validityPopupEditInputName}
          setStateName={setValidityPopupEditInputName}
          validityDescription={validityPopupEditInputDescription}
          setStateDescription={setValidityPopupEditInputDescription}
          isButtonActive={isButtonActive}
          setIsButtonActive={setIsButtonActive}
        />

        <AddNewCardPopup
          textButton={renderLoading}
          isOpen={isNewCardPopupOpen}
          onClose={closeAllPopups}
          onAddNewCard={handleAddNewCard}
          nameRef={nameRef}
          linkRef={linkRef}
          validityName={validityPopupNewCardInputName}
          setStateName={setValidityPopupNewCardInputName}
          validityDescription={validityPopupNewCardInputDescription}
          setStateDescription={setValidityPopupNewCardInputDescription}
          handleFocus={handleFocus}
          handleInputChange={handleInputChange}
          isButtonActive={isButtonActive}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          textButton={renderLoadingDelete}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handlePopupDeleteSubmit}
          inputValidity={[true]}
          isButtonActive={isButtonActive}
        />

        <EditAvatarPopup
          textButton={renderLoading}
          isOpen={isUpdateAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          avatarRef={avatarRef}
          validity={validityPopupUpdateAvatar}
          setState={setValidityPopupUpdateAvatar}
          handleFocus={handleFocus}
          handleInputChange={handleInputChange}
          isButtonActive={isButtonActive}
        />

        <ImagePopup
          name="image"
          isOpen={selectedCard}
          onClose={closeAllPopups}
          heading={selectedCard.heading}
          link={selectedCard.link}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
