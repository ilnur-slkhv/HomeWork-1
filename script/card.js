export class Card {
  constructor(dataTask, selectorTemplate, handleTaskTitle, handleTaskPhoto) {
    this._dataTask = dataTask;
    this._handleTaskTitle = handleTaskTitle;
    this._handleTaskPhoto = handleTaskPhoto;
    this._selectorTemplate = selectorTemplate;
  }

  _getTempate() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".card");
  }

  getElement() {
    this.element = this._getTempate().cloneNode(true);
    this.cardTitle = this.element.querySelector(".card__name");
    this.cardPhoto = this.element.querySelector(".card__photo");
    this.cardTime = this.element.querySelector(".card__time");
    this.cardCompleteness = this.element.querySelector(".card__completeness");

    if (!this._dataTask.urgency) {
      this.cardTime.remove();
    }
    if (!this._dataTask.stage) {
      this.cardCompleteness.remove();
    }

    this.cardTitle.textContent = this._dataTask.variety;
    this.cardPhoto.src = this._dataTask.photo_link;
    this.setEventListener();
    return this.element;
  }

  setEventListener() {
    this.cardTitle.addEventListener("click", this._handleTaskTitle);
    this.cardPhoto.addEventListener("click", this._handleTaskPhoto);
  }
}
