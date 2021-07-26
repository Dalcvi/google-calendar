class Form {
  constructor(form, eventAdd) {
    console.log('called');
    this.form = form;
    this.formTemplate = null;
    this.title = null;
    this.startingDate = null;
    this.endingDate = null;
    this.startingHour = null;
    this.endingHour = null;
    this.eventAdd = eventAdd;
    this.today = new Date();
    this.__setup();
  }

  __setup() {
    this.__formElementsSetup();
    this.__startingDateSetup();
    this.__endingDateSetup();
    this.__hourSetup(this.startingHour);
    this.__hourSetup(this.endingHour);
    this.__setupFormData();

    this.form.appendChild(this.formTemplate);
  }

  __formElementsSetup() {
    this.formTemplate = this.form.querySelector('.modal-form-template').content;
    this.title = this.formTemplate.querySelector('input[name="title"]');
    this.startingDate = this.formTemplate.querySelector(
      'input[name="starting-date"]'
    );
    console.log(this.startingDate);
    this.endingDate = this.formTemplate.querySelector(
      'input[name="ending-date"]'
    );
    this.startingHour = this.formTemplate.querySelector(
      'input[name="starting-hour"]'
    );
    this.endingHour = this.formTemplate.querySelector(
      'input[name="ending-hour"]'
    );
  }

  __startingDateSetup() {
    const todayDateString = this.__getFullDate(this.today);
    this.startingDate.setAttribute('min', todayDateString);
    this.startingDate.value = todayDateString;

    const onChange = () => {
      const tempDate = new Date(this.startingDate.value);
      if (this.__compareStringDates(this.startingDate.value, todayDateString)) {
        this.startingDate.value = todayDateString;
      }

      if (
        this.__compareStringDates(
          this.startingDate.value,
          this.endingDate.value
        )
      ) {
        return;
      }

      let newDate = this.__getFullDate(tempDate);
      this.endingDate.setAttribute('min', newDate);
      this.endingDate.value = this.startingDate.value;
    };

    this.startingDate.addEventListener(
      'change',
      this.__debounce(onChange, 500)
    );
  }

  __endingDateSetup() {
    this.endingDate.setAttribute('min', this.startingDate.value);
    this.endingDate.value = this.startingDate.value;

    const onChange = () => {
      if (
        this.__compareStringDates(
          this.startingDate.value,
          this.endingDate.value
        )
      ) {
        return;
      }

      let newDate = this.__getFullDate(new Date(this.startingDate.value));
      this.endingDate.setAttribute('min', newDate);
      this.endingDate.value = this.startingDate.value;
    };

    this.endingDate.addEventListener('change', this.__debounce(onChange, 500));
  }

  __hourSetup(element) {
    element.value = `${this.today.getHours()}:${this.today.getMinutes()}`;
    element.addEventListener(
      'change',
      this.__debounce(this.__hourOnChange.bind(this), 500)
    );
  }

  __hourOnChange() {
    if (this.startingDate.value !== this.endingDate.value) {
      return;
    }
    const [startingHour, startingMinutes] = this.startingHour.value.split(':');
    const [endingHour, endingMinutes] = this.endingHour.value.split(':');
    if (
      startingHour < endingHour ||
      (startingHour === endingHour && startingMinutes <= endingMinutes)
    ) {
      return;
    }
    this.endingHour.value = this.startingHour.value;
  }
  __clearFormData() {
    this.title = '';
    this.__startingDateSetup();
    this.__endingDateSetup();
    this.__hourSetup(this.startingHour);
    this.__hourSetup(this.endingHour);
    this.description = '';
  }

  __setupFormData() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = this.form.elements;
      if (!this.__checkTitle()) {
        return;
      }
      const titleValue = formData['title'].value;
      const startingDate = formData['starting-date'].value;
      const startingHour = formData['starting-hour'].value;
      const endingDate = formData['ending-date'].value;
      const endingHour = formData['ending-hour'].value;
      const description = formData['description'].value;
      this.eventAdd(
        titleValue,
        startingDate,
        startingHour,
        endingDate,
        endingHour,
        description
      );
    });
  }

  __checkTitle() {
    return this.title.value.length > 0;
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
