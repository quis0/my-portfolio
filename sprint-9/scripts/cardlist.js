class CardList {
  constructor(container, array, createCard) {
    this._container = container;
    this._array = array;
    console.log(this._array)
    this._createCard = createCard;
  }
  addCard(card) {
    this._container.appendChild(card);
  }
  render(openImage, images, imagePopupPic) {
    this._array.forEach((elem) => {
      const card = this._createCard(elem, openImage, images, imagePopupPic);
      this.addCard(card);
    })
  }
};
