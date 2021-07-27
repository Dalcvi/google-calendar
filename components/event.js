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
    this.__title = title;
    this.__starting =
      starting === null
        ? this.__createDate(startingDate, startingHour)
        : new Date(starting);
    this.__ending =
      ending === null
        ? this.__createDate(endingDate, endingHour)
        : new Date(ending);
    this.__description = description;
    this.__positions = {};
    this.__calculatePositionByDay();
  }

  /* Setup */

  __createDate(dateString, timeString) {
    let time = timeString.split(':');
    let date = dateString.split('-');

    return new Date(date[0], +date[1] - 1, +date[2], time[0], time[1]);
  }

  /* Position Calculation */

  // 1px = 1 minute
  __calculatePositionByDay() {
    let date = new Date(this.__starting);
    let pixelsLength = this.__getMinutesBetweenDates(
      this.__ending,
      this.__starting
    );
    if (pixelsLength === 0) {
      pixelsLength = 1;
    }
    let pixelsFromTop =
      this.__starting.getHours() * 60 + this.__starting.getMinutes();

    while (pixelsLength > 0) {
      let dayLength = this.__getPixelsInADay(pixelsFromTop, pixelsLength);

      pixelsLength -= dayLength;
      this.__positions[this.__getStringDay(date)] = {
        top: pixelsFromTop,
        length: dayLength,
      };

      pixelsFromTop = 0;
      date.setDate(date.getDate() + 1);
    }
  }

  /* Event Creation */

  // Could be much more efficient if I checked before
  // if this event is even in this week
  createEvents(startingSunday, calendarWindow) {
    let date = new Date(startingSunday);
    let titleAdded = false;
    for (let i = 0; i < 7; i++) {
      for (let key in this.__positions) {
        if (!this.__checkIfKeyIsSameDay(date, key)) {
          continue;
        }
        const event = document.createElement('div');
        if (!titleAdded) {
          const titleNode = document.createElement('h3');
          titleNode.appendChild(document.createTextNode(this.__title));
          const descriptionNode = document.createElement('p');
          descriptionNode.appendChild(
            document.createTextNode(this.__description)
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

  /* Utils */

  __styling(event, key, day) {
    event.classList.add('calendar__event');
    event.style.top = this.__positions[key].top + 'px';
    event.style.width = 100 / 8 + '%';
    event.style.minHeight = this.__positions[key].length + 'px';
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
}
