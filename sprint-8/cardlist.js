class CardList {
  constructor(container, array) {
    this.container = container;
    this.array = array;
  }
  addCard(card) {
    this.container.appendChild(card);
  }
  render() {
    this.array.forEach(elem => this.addCard(elem));
  }
};
