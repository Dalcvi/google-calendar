class Modal {
  constructor(eventButton, eventAdd) {
    this.eventButton = eventButton;
    this.form = null;
    this.modal = null;
    this.body = document.body;
    this.exitButton = null;
    this.modalActive = false;
    this.modalTop = 0;
    this.modalLeft = 0;
    this.eventAdd = eventAdd;
    this.__setup();
  }

  __setup() {
    this.__setupModal();
    this.__setButtonEvent(this.eventButton, this.__createModal);
    this.__setButtonEvent(this.exitButton, this.__removeModal);
    this.__modalCoordinatesByButton();
    this.__clickNotOnModal();
  }

  __setupModal() {
    this.modal = this.body
      .querySelector('.modal-template')
      .content.querySelector('.modal');
    this.exitButton = this.modal.querySelector('.modal-header__button');
    this.form = new Form(
      this.modal.querySelector('.modal-form'),
      this.eventAdd
    );
  }

  __createModal() {
    if (this.modalActive) {
      return;
    }
    this.modal.style.top = this.modalTop + 'px';
    this.modal.style.left = this.modalLeft + 'px';

    this.body.appendChild(this.modal);

    this.modalActive = true;
  }

  __modalCoordinatesByButton() {
    let rect = this.eventButton.getBoundingClientRect();

    this.modalTop = rect.top;
    this.modalLeft = rect.right + 5;
  }

  __setButtonEvent(button, func) {
    button.addEventListener('click', () => {
      func.call(this);
    });
  }

  __clickNotOnModal() {
    document.addEventListener('click', (e) => {
      if (
        !this.modalActive ||
        e.target === this.eventButton ||
        this.modal.contains(e.target)
      ) {
        return;
      }

      this.__removeModal();
    });
  }

  __removeModal() {
    this.modalActive = false;
    this.body.removeChild(this.modal);
  }
}
