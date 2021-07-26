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
      //   console.log(this.fromStorage[i]);
      let event = new Event(
        this.fromStorage[i].title,
        null,
        null,
        this.fromStorage[i].starting,
        null,
        null,
        this.fromStorage[i].ending,
        this.fromStorage[i].description
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

    this.eventsList.push(event.get());
    window.localStorage.setItem('events', JSON.stringify(this.eventsList));
    console.log(this.updateFunc);
    if (this.updateFunc !== null) {
      console.log('run');
      this.updateFunc();
    }
  }

  changeUpdateFunction(func) {
    this.updateFunc = func;
    console.log('wtf');
  }
}