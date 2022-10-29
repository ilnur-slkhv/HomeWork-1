// class Card {
//   constructor(dataTask, selectorTemplate) {
//     this._data = dataTask;
//     this._selectorTemplate = selectorTemplate;
//   }

//   _getTempate() {
//     //возвращает содержимое шаблона в видел DOM узла
//     return document
//       .querySelector(this._selectorTemplate)
//       .content.querySelector(".card");
//   }

//   getElement() {
//     this.element = this._getTempate().cloneNode(true); //клонируем полученное содержимое из шаблона
//     const cardTitle = this.element.querySelector(".card__variety");
//     const cardPhoto = this.element.querySelector(".card__photo");
//     const cardCheck = this.element.querySelector(".card__check");

//     if (!this._data.favourite) {
//       cardCheck.remove();
//     }

//     cardTitle.textContent = this._data.variety;
//     cardPhoto.src = this._data.photo_link;

//     return this.element;
//   }
// }

// const card = new Card();

// console.log(card);

class Card {
  constructor(dataTask, selectorTemplate) {
    this._dataTask = dataTask;
    this._selectorTemplate = selectorTemplate;
  }

  _getTempate() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".card");
  }

  getElement() {
    this.element = this._getTempate().cloneNode(true);
    const cardTitle = this.element.querySelector(".card__name");
    const cardPhoto = this.element.querySelector(".card__photo");
    const cardTime = this.element.querySelector(".card__time");
    const cardCompleteness = this.element.querySelector(".card__completeness");

    if (!this._dataTask.urgency) {
      cardTime.remove();
    }
    if (!this._dataTask.stage) {
      cardCompleteness.remove();
    }

    cardTitle.textContent = this._dataTask.variety;
    cardPhoto.src = this._dataTask.photo_link;
    return this.element;
  }
}
