class Card {
  constructor(obj, openImage, imagesArray, popupImage, userId) {
    this._name = obj.name;
    this._link = obj.link;
    this._likes = obj.likes;
    this._id = obj.id;
    this._ownerId = obj.ownerId;
    this._openImage = openImage;
    this._imagesArray = imagesArray;
    this._popupImage = popupImage;
    this._userId = userId;
    this.open = this.open.bind(this);
    this.remove = this.remove.bind(this);
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    if (this._id === undefined) {
      fetch(`https://praktikum.tk/cohort11/cards`, {
        headers: {
          authorization: '95676b56-2da6-4da6-b83d-5dd17042dba0',
        },
      }).then(res => res.json()).then(res => [...res].forEach(elem => {
        if (elem.name == this._name && elem.link == this._link) {
          this._id = elem._id;
          fetch(`https://praktikum.tk/cohort11/cards/${this._id}`, {
            method: 'DELETE',
            headers: {
              authorization: '95676b56-2da6-4da6-b83d-5dd17042dba0',
            },
          }).then(res => {
            if (res.ok) {
              event.target.closest('.place-card').remove();
            } else {
              return Promise.reject(res.status);
            }
          }).catch(err => console.log(err));
        }
      }))
    } else {
      fetch(`https://praktikum.tk/cohort11/cards/${this._id}`, {
        method: 'DELETE',
        headers: {
          authorization: '95676b56-2da6-4da6-b83d-5dd17042dba0',
        },
      }).then(res => {
        if (res.ok) {
          event.target.closest('.place-card').remove();
        } else {
          return Promise.reject(res.status);
        } //убрать повторение с помощью метода api
      }).catch(err => console.log(err));
    }




  }

  open() {
    if (event.target.classList.contains('place-card__image')) {
      this._imageLink = event.target.dataset.url;
      this._popupImage.src = this._imageLink;
      this._openImage();
    }
  }

  _setEventListeners() {
    this._buttonDeleteIcon.addEventListener('click', this.remove);
    this._buttonLike.addEventListener('click', this.like);
    this._imageContainer.addEventListener('click', this.open);
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
    if (this._ownerId === this._userId) this._buttonDeleteIcon.style.display = 'block';

    const cardDescriptionContainer = document.createElement('div');
    cardDescriptionContainer.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = this._name;

    this._buttonLike = document.createElement('button');
    this._buttonLike.classList.add('place-card__like-icon');

    const likeCounter = document.createElement('p');
    likeCounter.classList.add('place-card__like-counter');
    likeCounter.textContent = this._likes;

    const likeContainer = document.createElement('div');
    likeContainer.classList.add('place-card__like-container');

    likeContainer.appendChild(this._buttonLike);
    likeContainer.appendChild(likeCounter);

    this._imageContainer.appendChild(this._buttonDeleteIcon);
    cardDescriptionContainer.appendChild(cardName);
    cardDescriptionContainer.appendChild(likeContainer);

    this._cardContainer.appendChild(this._imageContainer);
    this._cardContainer.appendChild(cardDescriptionContainer);

    this._setEventListeners();
    this._buttonDeleteIcon.addEventListener('click', () => this._removeEventListeners());

    return this._cardContainer;
  }
};
