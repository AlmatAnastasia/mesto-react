import { dataApi } from '../utils/utils.js';

class Api { // класс Api, который загружает данные с сервера

    // конструктор принимает: baseUrl и headers (authorization, 'Content-Type')
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl; // адрес сервера и идентификатор группы
        this._authorization = headers.authorization; // личный токен
        this._type = headers['Content-Type']; // 'Content-Type'
        this._personalURL = 'https://nomoreparties.co/v1/cohort-61/users/me';
        this._personalAvatarURL = 'https://nomoreparties.co/v1/cohort-61/users/me/avatar';
        this._cardsURL = 'https://nomoreparties.co/v1/cohort-61/cards';
        this._personalID = null;
    }

    // приватные методы
    _checkForErrors(res) { // проверить ответ на ошибки

        if (res.ok) { // проверить ответа
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклонить промис
        }
    }

    _returnHeadersGET() { // вернуть данные для заголовка GET-запроса
        return {
            headers: {
                authorization: this._authorization
            }
        }
    }

    _returnHeadersDELETE() { // вернуть данные для заголовка DELETE-запроса
        return {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        }
    }

    _returnHeadersData() { // вернуть данные для заголовка
        return {
            authorization: this._authorization,
            'Content-Type': this._type
        }
    }

    // публичные методы
    getInitialCards() { // загрузить карточки с сервера
        return fetch(this._cardsURL, this._returnHeadersGET())

            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })
    }

    getProfileInfo() { // загрузить информацию о пользователе с сервера
        return fetch(this._personalURL, this._returnHeadersGET())

            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })
    }

    editProfileInfo(name, about) { // редактировать профиль
        return fetch(this._personalURL, {
            method: 'PATCH',
            headers: this._returnHeadersData(),
            body: JSON.stringify({
                name: name,
                about: about
            })
        })

            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })
    }

    editProfileAvatar(avatar) { // редактировать аватар профиля
        return fetch(this._personalAvatarURL, {
            method: 'PATCH',
            headers: this._returnHeadersData(),
            body: JSON.stringify({
                avatar: avatar
            })
        })

            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })
    }

    addCard(name, link) { // добавить новую карточку
        return fetch(this._cardsURL, {
            method: 'POST',
            headers: this._returnHeadersData(),
            body: JSON.stringify({
                name: name,
                link, link
            })
        })

            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })
    }

    deleteCard(id) { // удалить карточку
        return fetch(`${this._cardsURL}/${id}`, this._returnHeadersDELETE())

            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })
    }

    updateAddStatusLike(id) { // лайкнуть карточку
        return fetch(`${this._cardsURL}/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
        })
            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })

    }

    updateDeleteStatusLike(id) { // убрать лайк
        return fetch(`${this._cardsURL}/${id}/likes`, this._returnHeadersDELETE())

            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })
    }

}

// Создание экземпляра класса
const api = new Api(dataApi);
export default api;