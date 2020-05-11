const placesList = document.querySelector('.places-list');

const popup = document.querySelector('#new-card');
const popupClose = popup.querySelector('.popup__close');
const popupButton = popup.querySelector('.popup__button');
const popupForm = document.forms.new;
const { name, link } = popupForm.elements;

const imagePopup = document.querySelector('#image-popup');
const imagePopupPic = imagePopup.querySelector('.popup__image');
const imagePopupClose = imagePopup.querySelector('.popup__close');
const images = [...placesList.querySelectorAll('.place-card__image')];

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
        <input type="text" name="${firstInputName}" id="${firstInputName}" minlength="2" maxlength="30" class="popup__input popup__input_type_name" required placeholder="${firstPlaceholder}">
        <span id="error-${firstInputName}" class="popup__error-message"></span>
        <input type="text" name="${secondInputName}" id="${secondInputName}" minlength="2" maxlength="30" class="popup__input popup__input_type_link-url" required
        placeholder="${secondPlaceholder}">
        <span id="error-${secondInputName}" class="popup__error-message"></span>
        <button type class="button popup__button popup__button_valid">${buttonText}</button>
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

const resetErrors = (form) => {
  const inputs = [...form.elements];
  inputs.forEach((input) => {
    if (input.type !== 'submit') {
      input.setCustomValidity('');
      let errorElem = form.querySelector(`#error-${input.id}`);
      errorElem.textContent = '';
    }
  });
};

const setSubmitButtonState = (button, state) => {
  if (state) {
    button.removeAttribute('disabled');
    button.classList.add(`popup__button_valid`);
    button.classList.remove(`popup__button_invalid`);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(`popup__button_invalid`);
    button.classList.remove(`popup__button_valid`);
  }
};



const putTogglerOnClose = (button) => {
  const popup = button.closest('.popup');
  const form = popup.querySelector('.popup__form');

  button.addEventListener('click', () => {
    if (form) {
      resetErrors(form);
      if (form.id == 'new') setSubmitButtonState(popupButton, false);
      form.reset();
    };
    togglePopup(popup)
  });
};

const togglePopup = (popup) => popup.classList.toggle('popup_is-opened');

const createEditPopup = () => {
  const root = document.querySelector('.root');
  const popup = createPopup(...editFormData);

  const editPopupSaveButton = popup.querySelector('.popup__button');
  const editPopupCloseButton = popup.querySelector('.popup__close');
  const editForm = popup.querySelector('.popup__form');
  const [userName, about] = [...editForm.elements];
  editPopupSaveButton.classList.add('popup__button_fontsize_medium');

  editButton.addEventListener('click', () => {
    togglePopup(editPopup);
    setSubmitButtonState(editPopupSaveButton, true);
    userName.setAttribute('value', userInfoName.textContent);
    about.setAttribute('value', userInfoAbout.textContent);
    putFocus(userName);
  });

  putTogglerOnClose(editPopupCloseButton);

  editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userInfoName.textContent = userName.value;
    userInfoAbout.textContent = about.value;
    togglePopup(editPopup)
  });

  root.appendChild(popup);
  return popup;
};

const editPopup = createEditPopup();

const editForm = document.forms.edit;

const isValidate = (input) => {
  input.setCustomValidity('');

  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false
  }

  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity(errorMessages.wrongLength);
    return false
  }

  if (input.validity.typeMismatch && input.type === 'url') {
    input.setCustomValidity(errorMessages.wrongUrl);
    return false
  }

  return input.checkValidity();
};

const isFieldValid = (input) => {
  const errorElem = input.parentNode.querySelector(`#error-${input.id}`);

  const isValid = isValidate(input);

  errorElem.textContent = input.validationMessage;

  return isValid;
};

const isFormValid = (form) => {
  const inputs = [...form.elements];

  let isValid = true;

  inputs.forEach((input) => {
    if (input.type !== 'submit') {
      if (!isFieldValid(input)) isValid = false;
    }
  });

  return isValid;
};

const handlerInputForm = (evt) => {
  const submit = evt.currentTarget.querySelector('.button');
  const inputs = [...evt.currentTarget.elements];

  if (evt.target.type !== 'submit') {
    isFieldValid(evt.target);

    if (inputs.every(isValidate)) {
      setSubmitButtonState(submit, true);
    } else {
      setSubmitButtonState(submit, false);
    }
  }
};

const checkValidity = (evt) => {
  evt.preventDefault();
  const currentForm = evt.target;
  isFormValid(currentForm);
};

const deleteCard = (elem) => placesList.removeChild(elem.closest('.place-card'));

const createCard = (name, link) => {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('place-card');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('place-card__image');
  imageContainer.setAttribute('style', `background-image: url('${link}')`);
  imageContainer.setAttribute('data-url', `${link}`);
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

const toggleLike = (elem) => elem.classList.toggle('place-card__like-icon_liked');

const openCard = (elem) => {
  const imageLink = elem.dataset.url;
  imagePopupPic.src = imageLink;
  togglePopup(imagePopup);
};

const handleCardFunctions = (event) => {
  if (event.target.classList.contains('place-card__delete-icon')) deleteCard(event.target);

  if (event.target.classList.contains('place-card__like-icon')) toggleLike(event.target)

  if (event.target.classList.contains('place-card__image')) openCard(event.target);
}

const addCard = (event) => {
  event.preventDefault();
  const cardContainer = createCard(name.value, link.value);

  placesList.appendChild(cardContainer);

  togglePopup(popup);

  popupForm.reset();
  resetErrors(popupForm);
  setSubmitButtonState(popupButton, false);
};

const handleEscapeButton = (event) => {
  try {
    const popup = document.querySelector('.popup_is-opened');
    const form = popup.querySelector('.popup__form');

    if (popup && event.code === 'Escape') {
        if (form) {
          resetErrors(form);
          form.reset();
          if (form.id == 'new') setSubmitButtonState(popupButton, false);
        };
        togglePopup(popup);
      }
    }

  catch {
    return;
  }
};

addCards();

userInfoButton.addEventListener('click', () => {
  togglePopup(popup);
  putFocus(name);
});

putTogglerOnClose(popupClose);
putTogglerOnClose(imagePopupClose);

placesList.addEventListener('click', handleCardFunctions);

popupForm.addEventListener('submit', checkValidity);
popupForm.addEventListener('submit', addCard);
popupForm.addEventListener('input', handlerInputForm, true);

editForm.addEventListener('submit', checkValidity);
editForm.addEventListener('input', handlerInputForm, true);

document.addEventListener('keydown', handleEscapeButton);


/*
 Что понравилось:
 - Используется всплытие
 - Форма «Новое место» валидируется
 - Код разбит на небольшие функции, у функций ясные имена;
 - Код структурирован
 Надо исправить:
 - В работе приложения есть баг:
 1) Открываем попап добавления карточки
 2) Заполняем инпуты до активации кнопки
 3) Закрываем попап крестиком
 4) Открываем - можно добавлять карточку без названия и link
*/
