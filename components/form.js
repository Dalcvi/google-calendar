class Form {
  constructor(form, eventAdd, closeModal) {
    console.log('called');
    this.__form = form;
    this.__formTemplate = null;
    this.__title = null;
    this.__startingDate = null;
    this.__endingDate = null;
    this.__startingHour = null;
    this.__endingHour = null;
    this.__description = null;
    this.__eventAdd = eventAdd;
    this.__today = new Date();
    this.__closeModal = closeModal;
    this.__setup();
  }

  /* Setup */

  __setup() {
    this.__formElementsSetup();
    this.__startingDateSetup();
    this.__endingDateSetup();
    this.__hourSetup(this.__startingHour);
    this.__hourSetup(this.__endingHour);
    this.__setupFormData();

    this.__form.appendChild(this.__formTemplate);
  }

  __formElementsSetup() {
    this.__formTemplate = this.__form.querySelector(
      '.modal-form-template'
    ).content;
    this.__title = this.__formTemplate.querySelector('input[name="title"]');
    this.__startingDate = this.__formTemplate.querySelector(
      'input[name="starting-date"]'
    );
    this.__endingDate = this.__formTemplate.querySelector(
      'input[name="ending-date"]'
    );
    this.__startingHour = this.__formTemplate.querySelector(
      'input[name="starting-hour"]'
    );
    this.__endingHour = this.__formTemplate.querySelector(
      'input[name="ending-hour"]'
    );
    this.__description = this.__formTemplate.querySelector(
      'textarea[name="description"]'
    );
  }

  __startingDateSetup() {
    const todayDateString = this.__getFullDate(this.__today);
    this.__startingDate.value = todayDateString;

    const onChange = () => {
      const tempDate = new Date(this.__startingDate.value);
      if (
        this.__compareStringDates(
          this.__startingDate.value,
          this.__endingDate.value
        )
      ) {
        return;
      }

      let newDate = this.__getFullDate(tempDate);
      this.__endingDate.setAttribute('min', newDate);
      this.__endingDate.value = this.__startingDate.value;
    };

    this.__startingDate.addEventListener(
      'change',
      this.__debounce(onChange, 500)
    );
  }

  __endingDateSetup() {
    this.__endingDate.setAttribute('min', this.__startingDate.value);
    this.__endingDate.value = this.__startingDate.value;

    const onChange = () => {
      if (
        this.__compareStringDates(
          this.__startingDate.value,
          this.__endingDate.value
        )
      ) {
        return;
      }

      let newDate = this.__getFullDate(new Date(this.__startingDate.value));
      this.__endingDate.setAttribute('min', newDate);
      this.__endingDate.value = this.__startingDate.value;
    };

    this.__endingDate.addEventListener(
      'change',
      this.__debounce(onChange, 500)
    );
  }

  __hourSetup(element) {
    element.value = `${this.__today.getHours()}:${this.__today.getMinutes()}`;
    element.addEventListener(
      'change',
      this.__debounce(this.__hourOnChange.bind(this), 500)
    );
  }

  __setupFormData() {
    this.__form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = this.__form.elements;
      if (!this.__checkTitle()) {
        return;
      }
      const titleValue = formData['title'].value;
      const startingDateValue = formData['starting-date'].value;
      const startingHourValue = formData['starting-hour'].value;
      const endingDateValue = formData['ending-date'].value;
      const endingHourValue = formData['ending-hour'].value;
      const descriptionValue = formData['description'].value;
      this.__eventAdd(
        titleValue,
        startingDateValue,
        startingHourValue,
        endingDateValue,
        endingHourValue,
        descriptionValue
      );

      this.__clearFormData();
      this.__closeModal();
    });
  }

  /* Utils */

  __hourOnChange() {
    if (this.__startingDate.value !== this.__endingDate.value) {
      return;
    }
    const [startingHour, startingMinutes] =
      this.__startingHour.value.split(':');
    const [endingHour, endingMinutes] = this.__endingHour.value.split(':');
    if (
      startingHour < endingHour ||
      (startingHour === endingHour && startingMinutes <= endingMinutes)
    ) {
      return;
    }
    this.__endingHour.value = this.__startingHour.value;
  }
  __clearFormData() {
    this.__title.value = '';
    this.__startingDateSetup();
    this.__endingDateSetup();
    this.__hourSetup(this.__startingHour);
    this.__hourSetup(this.__endingHour);
    this.__description.value = '';
  }

  __checkTitle() {
    return this.__title.value.length > 0;
  }

  __getFullDate(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1);
    month = month.length === 1 ? '0' + month : month;
    let day = String(date.getDate());
    day = day.length === 1 ? '0' + day : day;
    return `${year}-${month}-${day}`;
  }

  __compareStringDates(dateOne, dateTwo) {
    const normalDateOne = new Date(dateOne);
    const normalDateTwo = new Date(dateTwo);

    return normalDateTwo.getTime() - normalDateOne.getTime() >= 0;
  }

  __debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
}
