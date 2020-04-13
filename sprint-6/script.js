const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
  }
];

const placesList = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');
const popupForm = document.forms.new;
const formButton = document.querySelector('.popup__button');
const userInfo = document.querySelector('.user-info');
const divs = document.querySelectorAll('div');

function createCard(name, link) {

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('place-card');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('place-card__image');
  imageContainer.setAttribute('style', `background-image: url('${link}')`);

  const buttonDeleteIcon = document.createElement('button');
  buttonDeleteIcon.classList.add('place-card__delete-icon');
  buttonDeleteIcon.addEventListener('click', deleteCard);

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

function deleteCard(event) {
  placesList.removeChild(event.target.parentNode.parentNode);
};

function addCards() {
  initialCards.forEach(function(value) {
    placesList.appendChild(createCard(value.name, value.link));
  });
};

function togglePopup(event) {
  if (event.target.classList.contains('popup__close') || event.target.classList.contains('user-info__button')) {
    popup.classList.toggle('popup_is-opened');
  }
};

function toggleLike(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
};

function addCard(event) {
  event.preventDefault();

  const name = popupForm.elements.name;
  const link = popupForm.elements.link;

  const cardContainer = createCard(name.value, link.value);

  placesList.appendChild(cardContainer);

  popup.classList.toggle('popup_is-opened');
  popupForm.reset();
};

addCards();

userInfo.addEventListener('click', togglePopup);
popupContent.addEventListener('click', togglePopup);
placesList.addEventListener('click', toggleLike);
popupForm.addEventListener('submit', addCard);

