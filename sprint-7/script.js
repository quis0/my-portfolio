const placesList = document.querySelector('.places-list');

const popup = document.querySelector('#new-card');
const popupClose = popup.querySelector('.popup__close');
const popupForm = document.forms.new;

const imagePopup = document.querySelector('#image-popup');
const imagePopupPic = imagePopup.querySelector('.popup__image');
const imagePopupClose = imagePopup.querySelector('.popup__close');
const images = Array.from(placesList.querySelectorAll('.place-card__image'));

const userInfoName = document.querySelector('.user-info__name');
const userInfoAbout = document.querySelector('.user-info__job');
const userInfoButton = document.querySelector('.user-info__button'); //Поиск одного и того же DOM-элемента не должен происходить дважды.
const editButton = document.querySelector('.user-info__edit-button'); //Константы описаны в той области видимости, в которой объявлена функция, и внутри неё значения констант берутся из замыкания.


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

const putToggleListenerOnClose = (button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => { togglePopup(popup) });
};

//добавить функцию, которая вешает слушатели на кнопки
const createEditPopup = () => {
  const root = document.querySelector('.root');
  //Операции над DOM-элементами выполняются до их вставки в разметку. СЮДА
  root.appendChild(createPopup(...editFormData)); //createPopup(...) заменить на константу и менять ее свойства

  const editPopup = document.querySelector('#edit-popup');
  const editPopupSaveButton = editPopup.querySelector('.popup__button');
  const editPopupCloseButton = editPopup.querySelector('.popup__close');
  const editForm = document.forms.edit;
  const [userName, about] = [...editForm.elements];
  editPopupSaveButton.classList.add('popup__button_fontsize_medium');

  userName.setAttribute('value', userInfoName.textContent); //Операции над DOM-элементами выполняются до их вставки в разметку.
  about.setAttribute('value', userInfoAbout.textContent);

  editButton.addEventListener('click', () => {
    togglePopup(editPopup);
    putFocus(userName);
  });

  putToggleListenerOnClose(editPopupCloseButton);

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

// const showCard = (event) => {
//   if(event.target.classList.contains('place-card__image')) {
//     event.classList.toggle('image_is-opened');
//   }
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
  images.push(imageContainer);

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

const openCard = () => {
  if (event.target.classList.contains('place-card__image')) {
    const imageLink = event.target.style.backgroundImage;
    imagePopupPic.src = imageLink.slice(5,-2);
    togglePopup(imagePopup);
  }
}

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
putToggleListenerOnClose(popupClose);
putToggleListenerOnClose(imagePopupClose);

placesList.addEventListener('click', deleteCard);
placesList.addEventListener('click', toggleLike);
placesList.addEventListener('click', openCard);

popupForm.addEventListener('submit', addCard);


