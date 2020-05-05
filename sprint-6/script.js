const placesList = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupForm = document.forms.new;
const userInfoButton = document.querySelector('.user-info__button');

function deleteCard(event) {
  if (event.target.classList.contains('place-card__delete-icon')) {
    placesList.removeChild(event.target.closest('.place-card'));
  }
}

function createCard(name, link) {

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('place-card');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('place-card__image');
  imageContainer.setAttribute('style', `background-image: url('${link}')`);

  const buttonDeleteIcon = document.createElement('button');
  buttonDeleteIcon.classList.add('place-card__delete-icon');

  const cardDescriptionContainer = document.createElement('div');
  cardDescriptionContainer.classList.add('place-card__description');

  const cardName = document.createElement('h3');
  cardName.classList.add('place-card__name');
  cardName.textContent = name;

  const buttonLike = document.createElement('button');
  buttonLike.classList.add('place-card__like-icon');

  imageContainer.appendChild(buttonDeleteIcon);
  cardDescriptionContainer.appendChild(cardName);
  cardDescriptionContainer.appendChild(buttonLike);

  cardContainer.appendChild(imageContainer);
  cardContainer.appendChild(cardDescriptionContainer);

  return cardContainer;
};

function addCards() {
  // Можно лучше -- стрелочная функция и деструктуризация
  initialCards.forEach(({ name, link }) => placesList.appendChild(createCard(name, link)));
};

function togglePopup() {
  popup.classList.toggle('popup_is-opened');
};

// Делегирование -- отлично
function toggleLike(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
};

function addCard(event) {
  event.preventDefault();

  const { name, link } = popupForm.elements;

  const cardContainer = createCard(name.value, link.value);

  placesList.appendChild(cardContainer);

  togglePopup();
  popupForm.reset();
};

addCards();

userInfoButton.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);
placesList.addEventListener('click', toggleLike);
placesList.addEventListener('click', deleteCard);
popupForm.addEventListener('submit', addCard);

// Здравствуйте

// Хорошая аккуратная работа -- зачтено.

// ## Итог

// - код работает, нет синтаксических и других ошибок
// - функционал, перечисленный в задании, работает (при перезагрузке на страницу добавляются 10 карточек,
//   форма открывается и закрывается, можно добавить, удалить и лайкнуть карточку)
// - функционал работает без ошибок
// - карточку можно добавить нажав Enter, находясь в одном из текстовых полей
// - верное использование `let` и `const`
// - функции, декларированные как `function functionName() {}` не вызываются до того, как были объявлены
