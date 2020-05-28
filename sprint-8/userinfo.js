class UserInfo {
  constructor(name, about) {
    this._name = name.textContent;
    this._about = about.textContent;
  }
  setUserInfo(name, about) {
    this._name = name;
    this._about = about;
  }
  updateUserInfo(nameField, aboutField) {
    nameField.textContent = this._name;
    aboutField.textContent = this._about;
  }
  getName() {
    return this._name;
  }
  getAbout() {
    return this._about;
  }
}
