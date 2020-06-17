class Popup {
  constructor(popup) {
    this._popup = popup;
    /*
     Можно лучше:
     - Удалить неиспользуемую переменную
     */
    this._isForm = true;

    /*
     Надо исправить:
      - Избавиться от блока try/catch, обрабатывать через условия
    */

    if (this._popup.querySelector('.popup__form')) {
      this._form = this._popup.querySelector('.popup__form');

    } else {
      this._isForm = false;
    }


  }

  open() {
    this._popup.classList.toggle('popup_is-opened', true);
  }

  close() {
    this._popup.classList.toggle('popup_is-opened', false);
  }

  getForm() {
    if (this._isForm) {
      return this._form;
    }
    return;
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

