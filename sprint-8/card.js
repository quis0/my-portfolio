class Card {
/*REVIEW. Можно лучше. Чтобы не перечислять все атрибуты карточки в параметрах конструктора, можно рассмотреть вариант передачи в параметр
конструктора объекта, например objCard, со свойствами -атрибутами карточки, и обращаться к name и link как к свойствам этого объекта objCard.name
и objCard.link. Передача объекта в качестве значения параметра удобна, когда надо передать много аргументов (тогда их и определяют как свойства
одного объекта), а количество атрибутов карточки может увеличиться. Про передачу в параметры функции объекта можно прочитать здесь
http://www.webpupil.ru/javascript_pract_view.php?id=7
Передача объекта и переменной в функцию в Javascript
*/
  constructor(name, link, openImage, imagesArray, popupImage) {
    this._name = name;
    this._link = link;
    this._openImage = openImage;
    this._imagesArray = imagesArray;
    this._popupImage = popupImage;
    this.open = this.open.bind(this);
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
    /*REVIEW. Можно лучше. Если Вы хотите добавлять элемент в какой-то массив, то это надо делать при рендере карточек, и при добавлении
    новой карточки из формы, так как метод create должен отвечать только за создание элемента карточки. К тому же у Вас уже создаётся массив
    экземпляров карточек (хотя лучше его не создавать, или создавать по-другому, смотрите комментарий в script.js по этому поводу.)
    Массив this._imagesArray я рекомендую Вам вывести в консоль и посмотреть, можно ли с такими данными работать.
      */
    this._imagesArray.push(this._imageContainer);
    // console.log(this._imagesArray);
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
