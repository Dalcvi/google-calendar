class Modal {
  constructor(eventButton, modalTemplate, formControlFunc) {
    this.eventButton = eventButton;
    this.modal = modalTemplate.content.querySelector('.modal');
    this.body = document.body;
    this.modalActive = false;
    this.modalTop = 0;
    this.modalLeft = 0;
    this.modalForm = null;
    this.formControlFunc = formControlFunc;
    this.__setup();
  }

  __setup() {
    this.__getModalForm();
    this.__setUpForm();
    this.__setButtonEvent(this.eventButton, this.____createOn);
    this.__modalCoordinatesByButton();
    this.__clickNotOnModal();
  }

  __getModalForm() {
    this.modalForm = this.modal.querySelector('.modal-form');
    console.log(this.modalForm);
  }

  __setUpForm() {
    this.modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = this.modalForm.elements;

      console.log(data.date);
      if (formControlFunc(formData));
    });
  }

  ____createOn() {
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
    console.log(rect.top, rect.right, rect.bottom, rect.left);
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
