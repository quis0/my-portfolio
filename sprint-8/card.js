class Card {
  constructor(name, link, popup, imagesArray, popupImage) {
    this._name = name;
    this._link = link;
    this._popup = popup;
    this._imagesArray = imagesArray;
    this._popupImage = popupImage;
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    event.target.closest('.place-card').remove();
  }

  open() {
    if (event.target.classList.contains('place-card__image')) {
      this._imageLink = event.target.dataset.url;
      this._popupImage.src = this._imageLink;
      this._popup.open();
    }
  }

  _setEventListeners() {
    this._buttonDeleteIcon.addEventListener('click', this.remove);
    this._buttonLike.addEventListener('click', this.like);
    this._imageContainer.addEventListener('click', this.open.bind(this));
  }

  _removeEventListeners() {
    this._buttonDeleteIcon.removeEventListener('click', this.remove);
    this._buttonLike.removeEventListener('click', this.like);
    this._imageContainer.removeEventListener('click', this.open);
  }

  create() {
    this._cardContainer = document.createElement('div');
    this._cardContainer.classList.add('place-card');

    this._imageContainer = document.createElement('div');
    this._imageContainer.classList.add('place-card__image');
    this._imageContainer.setAttribute('style', `background-image: url('${this._link}')`);
    this._imageContainer.setAttribute('data-url', `${this._link}`);
    this._imagesArray.push(this._imageContainer);

    this._buttonDeleteIcon = document.createElement('button');
    this._buttonDeleteIcon.classList.add('place-card__delete-icon');


    const cardDescriptionContainer = document.createElement('div');
    cardDescriptionContainer.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = this._name;

    this._buttonLike = document.createElement('button');
    this._buttonLike.classList.add('place-card__like-icon');

    this._imageContainer.appendChild(this._buttonDeleteIcon);
    cardDescriptionContainer.appendChild(cardName);
    cardDescriptionContainer.appendChild(this._buttonLike);

    this._cardContainer.appendChild(this._imageContainer);
    this._cardContainer.appendChild(cardDescriptionContainer);

    this._setEventListeners();
    this._buttonDeleteIcon.addEventListener('click', () => this._removeEventListeners());

    return this._cardContainer;
  }
};
