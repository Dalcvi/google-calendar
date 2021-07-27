class Modal {
  constructor(eventButton, eventAdd) {
    this.__eventButton = eventButton;
    this.__form = null;
    this.__modal = null;
    this.__body = document.body;
    this.__exitButton = null;
    this.__modalActive = false;
    this.__modalTop = 0;
    this.__modalLeft = 0;
    this.__eventAdd = eventAdd;
    this.__setup();
  }

  __setup() {
    this.__setupModal();
    this.__setButtonEvent(this.__eventButton, this.__createModal);
    this.__setButtonEvent(this.exitButton, this.__removeModal);
    this.__modalCoordinatesByButton();
    this.__clickNotOnModal();
  }

  __setupModal() {
    this.__modal = this.__body
      .querySelector('.modal-template')
      .content.querySelector('.modal');
    this.exitButton = this.__modal.querySelector('.modal-header__button');
    this.__form = new Form(
      this.__modal.querySelector('.modal-form'),
      this.__eventAdd,
      this.__removeModal.bind(this)
    );
  }

  __createModal() {
    if (this.__modalActive) {
      return;
    }
    this.__modal.style.top = this.__modalTop + 'px';
    this.__modal.style.left = this.__modalLeft + 'px';

    this.__body.appendChild(this.__modal);

    this.__modalActive = true;
  }

  __modalCoordinatesByButton() {
    let rect = this.__eventButton.getBoundingClientRect();

    this.__modalTop = rect.top;
    this.__modalLeft = rect.right + 5;
  }

  __setButtonEvent(button, func) {
    button.addEventListener('click', () => {
      func.call(this);
    });
  }

  __clickNotOnModal() {
    document.addEventListener('click', (e) => {
      if (
        !this.__modalActive ||
        e.target === this.__eventButton ||
        this.__modal.contains(e.target)
      ) {
        return;
      }

      this.__removeModal();
    });
  }

  __removeModal() {
    this.__modalActive = false;
    this.__body.removeChild(this.__modal);
  }
}
