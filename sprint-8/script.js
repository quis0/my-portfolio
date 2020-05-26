(function () {

  const placesList = document.querySelector('.places-list');
  const popup = document.querySelector('#new-card');
  const popupClose = popup.querySelector('.popup__close');
  const popupForm = document.forms.new;
  const { name, link } = popupForm.elements;
  const popupShell = new Popup(popup);
  popupShell.setEventListeners();
  const popupFormValidator = new FormValidator(popupShell.getForm());

  const imagePopup = document.querySelector('#image-popup');
  const imagePopupPic = imagePopup.querySelector('.popup__image');
  const imagePopupClose = imagePopup.querySelector('.popup__close');
  const images = [...placesList.querySelectorAll('.place-card__image')];
  const imagePopupShell = new Popup(imagePopup);
  imagePopupShell.setEventListeners();
  const openImage = () => imagePopupShell.open();

  const userInfoName = document.querySelector('.user-info__name');
  const userInfoAbout = document.querySelector('.user-info__job');
  const userInfoShell = new UserInfo(userInfoName, userInfoAbout);
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

  const createEditPopupShell = () => {
    const root = document.querySelector('.root');
    const popup = createPopup(...editFormData);

    const editPopupSaveButton = popup.querySelector('.popup__button');
    const editPopupCloseButton = popup.querySelector('.popup__close');
    const editForm = popup.querySelector('.popup__form');
    const [userName, about] = [...editForm.elements];
    editPopupSaveButton.classList.add('popup__button_fontsize_medium');

    const editPopupShell = new Popup(popup, root);
    editPopupShell.setEventListeners();

    editButton.addEventListener('click', () => {
      editPopupShell.open();
      editPopupFormValidator.setSubmitButtonState(true);
      userName.setAttribute('value', userInfoShell.getName());
      about.setAttribute('value', userInfoShell.getAbout());
      putFocus(userName);
    });

    editPopupCloseButton.addEventListener('click', () => {
      editPopupShell.resetErrors();
      editForm.reset();
      editPopupShell.close();
    });

    editForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      userInfoShell.setUserInfo(userName.value, about.value);
      userInfoShell.updateUserInfo(userInfoName, userInfoAbout);
      editPopupShell.close();
    });

    editPopupShell.create();

    return editPopupShell;
  };

  const editPopupShell = createEditPopupShell();
  const editPopupFormValidator = new FormValidator(editPopupShell.getForm());

  (function addCards() {
    const array = [];
    initialCards.forEach(({ name, link }) => array.push(new Card(name, link, openImage, images, imagePopupPic).create()));
    cardList = new CardList(placesList, array);
    cardList.render();
  })();

  const addCard = (event) => {
    event.preventDefault();
    const cardContainer = new Card(name.value, link.value, openImage, images, imagePopupPic).create();

    cardList.addCard(cardContainer);

    popupShell.close();

    popupForm.reset();
    popupShell.resetErrors();
    popupFormValidator.setSubmitButtonState(false);
  };

  userInfoButton.addEventListener('click', () => {
    popupFormValidator.setSubmitButtonState(false);
    popupShell.open();
    putFocus(name);
  });

  popupClose.addEventListener('click', () => {
    popupShell.resetErrors();
    popupFormValidator.setSubmitButtonState(false);
    popupForm.reset();
    popupShell.close();
  });

  imagePopupClose.addEventListener('click', () => {
    imagePopupShell.close();
  });


  popupFormValidator.setEventListeners();
  popupForm.addEventListener('submit', addCard);

  editPopupFormValidator.setEventListeners();
})();
