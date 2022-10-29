class Arise {
  constructor(className) {
    this._className = className;
    this.arise = document.querySelector(`.${className}`);
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  _handleEscUp(evt) {
    if (evt.key === "Escape") {
      console.log(evt.key);
      this.close();
    }
  }

  open() {
    this.arise.classList.add("arise__active");
    document.addEventListener("keyup", this._handleEscUp);
  }

  close() {
    this.arise.classList.remove("arise__active");
    document.removeEventListener("keyup", this._handleEscUp);
  }

  setEventListener() {
    this.arise.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains(this._className) ||
        evt.target.closest(".arise__close")
      ) {
        this.close();
      }
    });
  }
}
