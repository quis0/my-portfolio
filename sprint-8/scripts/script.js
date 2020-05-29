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

  /*+REVIEW. Надо исправить. Не надо объявлять let cardList (см. комментарий ниже) */


  /*+REVIEW. Надо исправить. Вы создаёте две формы из одной размётки, хотя нигде не сказано, что эти формы имеют одну структуру
  и эта структура не будет изменяться у каждой формы независимо друг от друга, или не будут появляться ещё формы с другой структурой.
  Клонировать размётку имеет смысл, если известно заранее, что у многих объектов будет одинаковая структура и с такими объектами
  происходит работа в цикле, где они и клонируются.
  Поэтому для двух имеющихся форм  нужно сделать размётку в index.html и работать с ней. Сделайте это, пожалуйста.
  */

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

  /*+REVIEW. Можно лучше. Вы два раза проходите цикл по массиву карточек (один раз в цикле forEach при создании массива array , второй раз при
  рендере карточек), длина которого может быть гораздо больше 10. Его длина может быть 100 и больше,
  Но, по массиву такой длины в этом проекте можно пройти только один раз, не замедляя работу программы в случае массива большой длины.

  Даю образец, как это можно сделать (обозначения тут не Ваши, и атрибуты карточки передаются в класс Card в виде объекта elem - смотрите
  рекомендацию по этому поводу в классе Card, но я, думаю, Вам не трудно будет разобраться):

  В script.js:
  (openPopupImg - метод открытия окна большого фото класса PopupImg, его можно сделать по-разному, не в этом суть.)

  const newCard = (elem, openPopupImg) => {
    const card = new Card(elem, openPopupImg);
    return card.create();
  }

  const placesList = new CardList(document.querySelector('.places-list'), initialCards, newCard);
  placesList.render(openPopupImg);


   В классе CardList:

  class CardList {
    constructor(container,cards, func) {
      this.container = container;
      this.cards = cards;
      this.func = func;
    }

    addCard = (element) => {
      this.container.appendChild(element);
    }
    render = (openPopupImg) => {
      this.cards.forEach((elem) => {

        const card = this.func(elem, openPopupImg);

        this.addCard(card);
      })
    }
  }

  */

  /*+REVIEW Надо исправить. Не надо объявлять let cardList (см. комментарий выше), так как при изменении проекта есть опасность, что когда-нибудь в
  в let cardList может оказаться пустота, в то время, когда Вам надо будет, чтобы там было какое-то значение какое-то значение.
  Поэтому  cardList нужно обозначить как const cardList и не оборачивать код в IIFE-функцию addCards, инструкция new CardList(placesList, array)
  и так выполняется сразу. */

  function createCard(object, openImage, images, imagePopupPic) {
    const card = new Card(object, openImage, images, imagePopupPic);
    return card.create();
  };

  const cardList = new CardList(placesList, initialCards, createCard);
  cardList.render(openImage, images, imagePopupPic);

  /*+REVIEW. Надо исправить. В файле-точке входа в проект, задача которого инициализировать весь проект, запускать его на выполнение,
  не создают новые именованные функции. Поэтому присваивать стрелочную функцию const addCard не надо. Надо эту безымянную стрелочную функцию
  просто добавлять на форму в качестве слушателя сабмита, как Вы это делаете для формы профиля. */

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



/*REVIEW. Резюме.

Работа хорошая и осмысленная, но необходимо внесение изменений.

Что можно улучшить.

1. Чтобы не перечислять все атрибуты карточки в параметрах конструктора, можно рассмотреть вариант передачи в параметр
конструктора объекта, со свойствами -атрибутами карточки (подробный комментарий в классе Card).

2. Если Вы хотите добавлять элемент в какой-то массив, то это надо делать при рендере карточек, и при добавлении
новой карточки из формы, а не в классе Card (подробный комментарий в классе Card).

3. По массиву карточек в этом проекте можно пройти в цикле только один раз (а не два, как у Вас), не замедляя работу
программы в случае массива большой длины (подробный комментарий и пример в этом файле).


Что надо исправить.

1. Не надо объявлять let cardList, надо определить const cardList (подробный комментарий в этом файле перед объявлением
 function addCards).

2.Для двух имеющихся форм  нужно сделать размётку в index.html и работать с ней (подробный комментарий в этом файле перед объявлением
 const createPopup).

3. Надо слушателем сабмита формы карточки сделать безымянную стрелочную функцию, как Вы это делаете для формы профиля (подробный
комментарий в этом файле перед объявлением const addCard).

4. Надо все файлы с расширением js занести в отдельную папку в корне Вашего проекта.


*/
