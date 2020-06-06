class UserInfo {
  constructor(nameField, aboutField, photoField) {
    this.name = null;
    this.about = null;
    this.userId = null;
    this._nameField = nameField;
    this._aboutField = aboutField;
    this._photoField = photoField;
  }
  setUserInfo(name, about) {
    this.name = name;
    this.about = about;
  }
  updateUserInfo() {
    this._nameField.textContent = this.name;
    this._aboutField.textContent = this.about;
    fetch('https://praktikum.tk/cohort11/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '95676b56-2da6-4da6-b83d-5dd17042dba0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name,
        about: this.about
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
      this.name = res.name;
      this.about = res.about;
      this.userId = res._id;
      this._nameField.textContent = res.name;
      this._aboutField.textContent = res.about;
      this._photoField.setAttribute('style', `background-image: url('${res.avatar}')`);
    }).catch(err => console.log(err));
  }
  getName() {
    return this.name;
  }
  getAbout() {
    return this.about;
  }
  getUserId() {
    return this.userId;
  }
}
