class Popup {
  constructor(popup, container = null) {
    this._container = container;
    this._popup = popup;
    // this._isForm = true;
    // this._closeButton = this._popup.querySelector('.popup__close');
    // try {
    //   this._submitButton = this._popup.querySelector('.popup__button');
    //   if (this._submitButton == null) throw 'notForm';
    // }
    // catch {
    //   this._isForm = false;
    // }
    // if (this._isForm) {
    //   this._form = this._popup.querySelector('.popup__form');
    // }
    //Это может пригодиться в следующих попапах, а может и не пригодиться who knows...
  }
  open() {
    this._popup.classList.toggle('popup_is-opened', true);
  }
  close() {
    this._popup.classList.toggle('popup_is-opened', false);
  }
  // getForm() {
  //   if (this._isForm) {
  //     return this._form;
  //   }
  //   return undefined;
  // }
  getPopup() {
    return this._popup;
  }
  create() {
    if (this._container != null) this._container.appendChild(this._popup);
  }
}
