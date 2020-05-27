class CardList {
  constructor(container, array) {
    this._container = container;
    this._array = array;
  }
  addCard(card) {
    this._container.appendChild(card);
  }
  render() {
    this._array.forEach(elem => this.addCard(elem));
  }
};
