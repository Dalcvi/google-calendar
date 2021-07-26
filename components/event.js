class Event {
  constructor(
    title,
    startingDate,
    startingHour,
    starting,
    endingDate,
    endingHour,
    ending,
    description
  ) {
    this.title = title;
    this.starting =
      starting === null
        ? this.__createDate(startingDate, startingHour)
        : new Date(starting);
    this.ending =
      ending === null
        ? this.__createDate(endingDate, endingHour)
        : new Date(ending);
    this.description = description;
    this.positions = {};
    this.__calculatePositionByDay();
  }

  get() {
    return this;
  }

  __createDate(dateString, timeString) {
    let time = timeString.split(':');
    let date = dateString.split('-');

    return new Date(date[0], +date[1] - 1, +date[2], time[0], time[1]);
  }
  // 1px = 1 minute
  __calculatePositionByDay() {
    let date = new Date(this.starting);
    let pixelsLength = this.__getMinutesBetweenDates(
      this.ending,
      this.starting
    );
    if (pixelsLength === 0) {
      pixelsLength = 1;
    }
    let pixelsFromTop =
      this.starting.getHours() * 60 + this.starting.getMinutes();

    while (pixelsLength > 0) {
      let dayLength = this.__getPixelsInADay(pixelsFromTop, pixelsLength);

      pixelsLength -= dayLength;
      this.positions[this.__getStringDay(date)] = {
        top: pixelsFromTop,
        length: dayLength,
      };

      pixelsFromTop = 0;
      date.setDate(date.getDate() + 1);
    }
  }

  __getMinutesBetweenDates(date1, date2) {
    return (date1.getTime() - date2.getTime()) / 60000;
  }

  __getStringDay(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  __getPixelsInADay(pixelsFromTop, pixelsLength) {
    const pixelsInDay = 24 * 60;
    if (pixelsInDay - pixelsFromTop - pixelsLength > 0) {
      return pixelsLength;
    } else {
      return pixelsInDay - pixelsFromTop;
    }
  }

  // Could be much more efficient if I checked before
  // if this event is even in this week
  createEvents(startingSunday, calendarWindow) {
    let date = new Date(startingSunday);
    let titleAdded = false;
    for (let i = 0; i < 7; i++) {
      for (let key in this.positions) {
        if (!this.__checkIfKeyIsSameDay(date, key)) {
          continue;
        }
        const event = document.createElement('div');
        if (!titleAdded) {
          const titleNode = document.createElement('h3');
          titleNode.appendChild(document.createTextNode(this.title));
          const descriptionNode = document.createElement('p');
          descriptionNode.appendChild(
            document.createTextNode(this.description)
          );
          event.appendChild(titleNode);
          event.appendChild(descriptionNode);
        }
        this.__styling(event, key, i);
        calendarWindow.appendChild(event);

        titleAdded = true;
      }
      date.setDate(date.getDate() + 1);
    }
  }

  __styling(event, key, day) {
    event.classList.add('calendar__event');
    event.style.top = this.positions[key].top + 'px';
    event.style.width = 100 / 8 + '%';
    event.style.minHeight = this.positions[key].length + 'px';
    event.style.left = (100 / 7) * day + '%';
  }

  __checkIfKeyIsSameDay(date1, key) {
    let keyDate = key.split('-');
    return (
      date1.getFullYear() == keyDate[0] &&
      date1.getMonth() == keyDate[1] &&
      date1.getDate() == keyDate[2]
    );
  }
}
