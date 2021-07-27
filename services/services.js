class Services {
  constructor() {
    this.fromStorage = window.localStorage.getItem('events');
    this.eventsList = [];
    this.__setup();
    this.updateFunc = null;
  }

  __setup() {
    if (this.fromStorage === null) {
      return;
    }
    this.fromStorage = JSON.parse(this.fromStorage);
    for (let i = 0; i < this.fromStorage.length; i++) {
      let event = new Event(
        this.fromStorage[i].__title,
        null,
        null,
        this.fromStorage[i].__starting,
        null,
        null,
        this.fromStorage[i].__ending,
        this.fromStorage[i].__description
      );
      this.eventsList.push(event);
    }
  }

  addEvent(
    title,
    startingDate,
    startingHour,
    endingDate,
    endingHour,
    description
  ) {
    const event = new Event(
      title,
      startingDate,
      startingHour,
      null,
      endingDate,
      endingHour,
      null,
      description
    );

    this.eventsList.push(event);
    window.localStorage.setItem('events', JSON.stringify(this.eventsList));
    if (this.updateFunc !== null) {
      this.updateFunc();
    }
  }

  changeUpdateFunction(func) {
    this.updateFunc = func;
  }
}
