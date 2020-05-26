class Popup {
  constructor(popup, container = null) {
    this._container = container;
    this._popup = popup;
    this._isOpened = false;
    this._isForm = true;

    try {
      this._form = this._popup.querySelector('.popup__form')
      if (this._form == null) throw 'notForm';
    }
    catch {
      this._isForm = false;
    }

    if (this._isForm) {
      this._submitButton = this._popup.querySelector('.popup__button');
    }
  }

  open() {
    this._popup.classList.toggle('popup_is-opened', true);
    this._isOpened = true;
  }

  close() {
    this._popup.classList.toggle('popup_is-opened', false);
    this._isOpened = false;
  }

  getForm() {
    if (this._isForm) {
      return this._form;
    }
    return undefined;
  }

  getPopup() {
    return this._popup;
  }

  create() {
    if (this._container != null) this._container.appendChild(this._popup);
  }

  resetErrors() {
    const inputs = [...this._form.elements];

    inputs.forEach((input) => {
      if (input.type !== 'submit') {
        input.setCustomValidity('');
        let errorElem = this._form.querySelector(`#error-${input.id}`);
        errorElem.textContent = '';
      }
    });
  }

  setEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {

        if (this._isForm) {
          this.resetErrors();
          this._form.reset();
        };

        this.close();
      }
    });

  }
}

