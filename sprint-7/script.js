const placesList = document.querySelector('.places-list');

const popup = document.querySelector('#new-card');
const popupClose = popup.querySelector('.popup__close');
const popupForm = document.forms.new;

const userInfoName = document.querySelector('.user-info__name');
const userInfoAbout = document.querySelector('.user-info__job');
const userInfoButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button');


const createPopup = (id, title, formName, firstInputName, secondInputName, firstPlaceholder, secondPlaceholder, buttonText) => {
  const markup = `
  <div class="popup" id="${id}">
    <div class="popup__content">
      <img src="./images/close.svg" alt="" class="popup__close">
      <h3 class="popup__title">${title}</h3>
      <form class="popup__form" novalidate name="${formName}">
        <input type="text" name="${firstInputName}" class="popup__input popup__input_type_name" required placeholder="${firstPlaceholder}">
        <input type="text" name="${secondInputName}" class="popup__input popup__input_type_link-url" required
        placeholder="${secondPlaceholder}">
        <button type class="button popup__button">${buttonText}</button>
      </form>
    </div>
  </div>
  `;
  const element = document.createElement('div');
  element.insertAdjacentHTML('afterbegin', markup);

  return element.firstElementChild;
};

const putFocus = (input) => {
  input.focus();
  input.selectionStart = input.value.length;
};

const createEditPopup = () => {
  const root = document.querySelector('.root');
  root.appendChild(createPopup(...editFormData));

  const editPopup = document.querySelector('#edit-popup');
  const editPopupSaveButton = editPopup.querySelector('.popup__button');
  const editPopupCloseButton = editPopup.querySelector('.popup__close');
  const editForm = document.forms.edit;
  const [userName, about] = [...editForm.elements];
  editPopupSaveButton.classList.add('popup__button_fontsize_medium');

  userName.setAttribute('value', userInfoName.textContent);
  about.setAttribute('value', userInfoAbout.textContent);

  editButton.addEventListener('click', () => {
    togglePopup(editPopup);
    putFocus(userName);
  });

  editPopupCloseButton.addEventListener('click', () => { togglePopup(editPopup) });

  editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userInfoName.textContent = userName.value;
    userInfoAbout.textContent = about.value;
    togglePopup(editPopup)
	});

  return editPopup;
}

const editPopup = createEditPopup();

// IIFE, input полям добавить border прозрачный (если его еще нет)

//валидация url
// function isUrlValid(userInput) {
//     var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
//     if(res == null)
//         return false;
//     else
//         return true;
// }

const deleteCard = (event) => {
  if (event.target.classList.contains('place-card__delete-icon')) {
    placesList.removeChild(event.target.closest('.place-card'));
  }
};

const createCard = (name, link) => {
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

const addCards = () => {
  initialCards.forEach(({ name, link }) => placesList.appendChild(createCard(name, link)));
};

const togglePopup = (elem) => elem.classList.toggle('popup_is-opened');

const toggleLike = (event) => {
  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
};

const addCard = (event) => {
  event.preventDefault();

  const { name, link } = popupForm.elements;

  const cardContainer = createCard(name.value, link.value);

  placesList.appendChild(cardContainer);

  togglePopup(popup);
  popupForm.reset();
};

addCards();


userInfoButton.addEventListener('click', () => { togglePopup(popup) });
popupClose.addEventListener('click', () => { togglePopup(popup) });

placesList.addEventListener('click', toggleLike);
placesList.addEventListener('click', deleteCard);
popupForm.addEventListener('submit', addCard);


