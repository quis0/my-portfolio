class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    placesList.removeChild(event.target.closest('.place-card'));
  }

  open(event) {
    if (event.target.classList.contains('place-card__image')) {
      const imageLink = event.target.dataset.url;
      imagePopupPic.src = imageLink;
      togglePopup(imagePopup);
    }
  }

  setEventListeners() {
    this.buttonDeleteIcon.addEventListener('click', this.remove);
    this.buttonLike.addEventListener('click', this.like);
    this.imageContainer.addEventListener('click', this.open);
  }

  removeEventListeners() {
    this.buttonDeleteIcon.removeEventListener('click', this.remove);
    this.buttonLike.removeEventListener('click', this.like);
    this.imageContainer.removeEventListener('click', this.open);
  }

  create() {
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('place-card');

    this.imageContainer = document.createElement('div');
    this.imageContainer.classList.add('place-card__image');
    this.imageContainer.setAttribute('style', `background-image: url('${this.link}')`);
    this.imageContainer.setAttribute('data-url', `${this.link}`);
    images.push(this.imageContainer);

    this.buttonDeleteIcon = document.createElement('button');
    this.buttonDeleteIcon.classList.add('place-card__delete-icon');


    const cardDescriptionContainer = document.createElement('div');
    cardDescriptionContainer.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = this.name;

    this.buttonLike = document.createElement('button');
    this.buttonLike.classList.add('place-card__like-icon');

    this.imageContainer.appendChild(this.buttonDeleteIcon);
    cardDescriptionContainer.appendChild(cardName);
    cardDescriptionContainer.appendChild(this.buttonLike);

    this.cardContainer.appendChild(this.imageContainer);
    this.cardContainer.appendChild(cardDescriptionContainer);

    this.setEventListeners();
    this.buttonDeleteIcon.addEventListener('click', () => this.removeEventListeners());

    return this.cardContainer;
  }
};
