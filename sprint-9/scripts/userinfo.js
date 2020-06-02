class UserInfo {
  constructor(nameField, aboutField, photoField) {
    this._name = null;
    this._about = null;
    this._nameField = nameField;
    this._aboutField = aboutField;
    this._photoField = photoField;
  }
  setUserInfo(name, about) {
    this._name = name;
    this._about = about;
  }
  updateUserInfo() {
    this._nameField.textContent = this._name;
    this._aboutField.textContent = this._about;
    fetch('https://praktikum.tk/cohort11/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '95676b56-2da6-4da6-b83d-5dd17042dba0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this._name,
        about: this._about
      })
    });
  }
  render() {
    fetch('https://praktikum.tk/cohort11/users/me', {
      headers: {
        authorization: '95676b56-2da6-4da6-b83d-5dd17042dba0'
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    }).then((res) => {
      this._name = res.name;
      this._about = res.about;
      this._nameField.textContent = res.name;
      this._aboutField.textContent = res.about;
      this._photoField.setAttribute('style', `background-image: url('${res.avatar}')`);
    }).catch(err => console.log(err));
  }
  getName() {
    return this._name;
  }
  getAbout() {
    return this._about;
  }
}
