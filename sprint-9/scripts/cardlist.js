class CardList {
  constructor(container, createCard) { //передать методы api для запросов к серверу
    this._container = container;
    this._createCard = createCard;
  }
  addCard(card, isPreloaded) {
    const cardLink = card.querySelector('.place-card__image').dataset.url || card.querySelector('.place-card__image').style.backgroundImage.slice(5, -2);
    const cardName = card.querySelector('.place-card__name').textContent;

    const allCardLinks = [...this._container.querySelectorAll('.place-card__image')].map(elem => elem.style.backgroundImage.slice(5, -2));
    const allCardNames = [...this._container.querySelectorAll('.place-card__name')].map(elem => elem.textContent);


    if (allCardNames.includes(cardName) && allCardLinks.includes(cardLink)) {
      console.log('This card is already exists');
      return undefined;
    }

    if (!isPreloaded) {
      fetch('https://praktikum.tk/cohort11/cards', {
        method: 'POST',
        headers: {
          authorization: '95676b56-2da6-4da6-b83d-5dd17042dba0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      }).then(res => {
        if (res.ok) {
          card.querySelector('.place-card__delete-icon').style.display = 'block';
          card.querySelector('.place-card__like-counter').textContent = '0';
        } else {
          return Promise.reject(res.status);
        }
      }).catch(err => console.log(err));
    }

    this._container.appendChild(card);

  }
  render(openImage, images, imagePopupPic, array) {
    this._array = array;
    this._array.forEach((elem) => {
      const card = this._createCard(elem, openImage, images, imagePopupPic);
      this.addCard(card, true);
    })
  }
};
