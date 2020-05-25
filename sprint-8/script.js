const placesList = document.querySelector('.places-list');

const popup = document.querySelector('#new-card');
const popupClose = popup.querySelector('.popup__close');
const popupButton = popup.querySelector('.popup__button');
const popupForm = document.forms.new;
const { name, link } = popupForm.elements;
const popupShell = new Popup(popup);

const imagePopup = document.querySelector('#image-popup');
const imagePopupPic = imagePopup.querySelector('.popup__image');
const imagePopupClose = imagePopup.querySelector('.popup__close');
const images = [...placesList.querySelectorAll('.place-card__image')];
const imagePopupShell = new Popup(imagePopup);

const userInfoName = document.querySelector('.user-info__name');
const userInfoAbout = document.querySelector('.user-info__job');
const userInfoButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button');

let cardList = {};

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

const togglePopup = (popup) => popup.classList.toggle('popup_is-opened');

const createEditPopup = () => {
  const root = document.querySelector('.root');
  const popup = createPopup(...editFormData);

  const editPopupSaveButton = popup.querySelector('.popup__button');
  const editPopupCloseButton = popup.querySelector('.popup__close');
  const editForm = popup.querySelector('.popup__form');
  const [userName, about] = [...editForm.elements];
  editPopupSaveButton.classList.add('popup__button_fontsize_medium');

  const popupShell = new Popup(popup, root);

  editButton.addEventListener('click', () => {
    popupShell.open();
    setSubmitButtonState(editPopupSaveButton, true);
    userName.setAttribute('value', userInfoName.textContent);
    about.setAttribute('value', userInfoAbout.textContent);
    putFocus(userName);
  });

  editPopupCloseButton.addEventListener('click', () => {
    resetErrors(editForm);
    editForm.reset();
    popupShell.close();
  });

  editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userInfoName.textContent = userName.value;
    userInfoAbout.textContent = about.value;
    popupShell.close();
  }); //(что делать с глобальными переменными типа userInfoName, userInfoAbout)

  popupShell.create();

  return popupShell.popup;
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

const addCards = () => {
  const array = [];
  initialCards.forEach(({ name, link }) => array.push(new Card(name, link, imagePopupShell, images, imagePopupPic).create()));
  cardList = new CardList(placesList, array);
  cardList.render();
};

const addCard = (event) => {
  event.preventDefault();
  const cardContainer = new Card(name.value, link.value, imagePopupShell, images, imagePopupPic).create();

  cardList.addCard(cardContainer);

  popupShell.close();

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
  popupShell.open();
  putFocus(name);
});

popupClose.addEventListener('click', () => {
  resetErrors(popupForm);
  setSubmitButtonState(popupButton, false);
  popupForm.reset();
  popupShell.close();
});

imagePopupClose.addEventListener('click', () => {
  imagePopupShell.close();
});

popupForm.addEventListener('submit', checkValidity);
popupForm.addEventListener('submit', addCard);
popupForm.addEventListener('input', handlerInputForm, true);

editForm.addEventListener('submit', checkValidity);
editForm.addEventListener('input', handlerInputForm, true);

document.addEventListener('keydown', handleEscapeButton);
