# Проект: Mesto

---

**_Содержание файла README.md_**

<p>
<a href="#description">Описание</a>
<br>
<a href="#figma">Ссылка на макет в Figma</a>
<br>
<a href="#demo">Демонстрация</a>
<br>
<a href="#file_structure">Файловая структура</a>
<br>
<a href="#technologies">Использованные технологии</a>
<br>
<a href="#functionality">Функциональность</a>
</p>

<div id="description"></div>
<h2>Описание</h2>
<p>Данный проект реализован и запущен с помощью Create React App и представляет собой сервис Mesto: интерактивную страницу, отображающую карточки с фотографиями мест. Данные корточек получены с помощью Api запросов на сервер Яндекс.Практикума. Данная версия является копией реализованного сайта на JavaScript.<br>
В каталоге проекта его можно запустить командой 'npm start mesto-react'.</p>

<div id="demo"></div>
<h2>Демонстрация</h2>
<h3>Ссылка на сайт <a href="https://almatanastasia.github.io/mesto-react/">тут</a> !</h3>
<img src="./src/images/Demo_index.png" alt="Демо страницы index.html" width="900">

<div id="file_structure"></div>
<h2>Файловая структура</h2>
<pre>
.
├── public             # HTML<br>
├── src                CSS, JS-файлы, шрифты и изображения<br>
├── .gitignore         # Файл для игнорирования/предотвращения передачи файлов<br>
├── .nojekyll          # Пустой файл для публикации на GitHub Pages<br>
├── package-lock.json  # Файл блокировки, содержащий информацию о зависимостях/пакетах с их точными номерами версий<br>
├── package.json       # Файл управления версиями, используемый для установки нескольких пакетов в проекте<br>
├── README.md          # Файл документации проекта<br>
</pre>
<h2>Файловая структура директории public</h2>
<pre>
.
└── index.html      # Главная страница сервиса
</pre>
<h2>Файловая структура директории src</h2>
<pre>
.
├── blocks          # Файлы стилей блоков<br>
├── components      # Файлы компонентов<br>
├── fonts           # Файлы шрифтов<br>
├── images          # Файлы изображений<br>
├── pages           # Файлы стилей страниц<br>
├── utils           # Файлы утилитарных модулей (отдельные функции и константы)<br>
├── vendor          # Файлы сторонних библиотек<br>
├── index.css       # Файл стилей<br>
└── index.js        # Основной JavaScript файл, выполняющий развёртывание React-приложения
</pre>
<h2>Файловая структура директории vendor</h2>
<pre>
.
├── fonts           # Файлы шрифтов<br>
├── normalize.css   # CSS-файл, обеспечивающий для HTML-элементов лучшую кроссбраузерность в стилях по умолчанию<br>
</pre>

<div id="technologies"></div>
<h2>Использованные технологии</h2>
<p>
⬥ JSX, Create React App, React Hooks<br>
⬥ Работа с API (метод fetch, формат JSON, методы HTTP)<br>
⬥ Метод HTTP (GET)
</p>

<div id="functionality"></div>
<h2>Функциональность</h2>
<p>✶ Информация о пользователе (данные получены с сервера)</p>
<p>✶ Карточки мест (данные получены с сервера)</p>
<p>✶ Четыре формы</p>
<p>Форма редактирования профиля</p>
<img src="./src/images/Demo_form_edit.png" alt="Демо форма &quot;Редактировать профиль&quot;" width="900">
<p>Форма добавления новой карточки</p>
<img src="./src/images/Demo_form_new-card.png" alt="Демо форма &quot;Новое место&quot;" width="900">
<p>Форма просмотра фотографий</p>
<img src="./src/images/Demo_form_image.png" alt="Демо форма &quot;Фотография&quot;" width="900">
<p>Форма обновления аватара пользователя</p>
<img src="./src/images/Demo_form_update-avatar.png" alt="Демо форма &quot;Обновить аватар&quot;" width="900">
