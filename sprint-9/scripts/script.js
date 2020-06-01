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
  const userInfoPhoto = document.querySelector('.user-info__photo');

  (function setUserInfo() {
    fetch('https://praktikum.tk/cohort11/users/me', {
      headers: {
        authorization: '95676b56-2da6-4da6-b83d-5dd17042dba0'
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    }).then((res) => {
      userInfoName.textContent = res.name;
      userInfoAbout.textContent = res.about;
      userInfoPhoto.setAttribute('style', `background-image: url('${res.avatar}')`);
    }).catch(err => console.log(err));
  })();

  const userInfoShell = new UserInfo(userInfoName, userInfoAbout);
  const userInfoButton = document.querySelector('.user-info__button');
  const editButton = document.querySelector('.user-info__edit-button');

  const putFocus = (input) => {
    input.focus();
    input.selectionStart = input.value.length;
  };

  const createEditPopupShell = () => {
    const popup = document.querySelector('#edit-popup');

    const editPopupSaveButton = popup.querySelector('.popup__button');
    const editPopupCloseButton = popup.querySelector('.popup__close');
    const editForm = popup.querySelector('.popup__form');
    const [userName, about] = [...editForm.elements];
    editPopupSaveButton.classList.add('popup__button_fontsize_medium');

    const editPopupShell = new Popup(popup);
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

    return editPopupShell;
  };

  const editPopupShell = createEditPopupShell();
  const editPopupFormValidator = new FormValidator(editPopupShell.getForm());

  function createCard(object, openImage, images, imagePopupPic) {
    const card = new Card(object, openImage, images, imagePopupPic);
    return card.create();
  };

  const cardList = new CardList(placesList, initialCards, createCard);
  cardList.render(openImage, images, imagePopupPic);

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
  popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const popupFormElements = {
      name: name.value,
      link: link.value
    };
    const cardContainer = new Card(popupFormElements, openImage, images, imagePopupPic).create();
    cardList.addCard(cardContainer);

    popupShell.close();

    popupForm.reset();
    popupShell.resetErrors();
    popupFormValidator.setSubmitButtonState(false);
  });

  editPopupFormValidator.setEventListeners();


})();
