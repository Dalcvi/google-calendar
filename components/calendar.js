class Calendar {
  constructor(
    calendar,
    todayButton,
    monthText,
    leftButton,
    rightButton,
    events,
    updateFunction
  ) {
    this.__calendar = calendar;
    this.__todayButton = todayButton;
    this.__monthText = monthText;
    this.__leftButton = leftButton;
    this.__rightButton = rightButton;
    this.__weekOffset = 0;
    this.__headerCells = [];
    this.__today = new Date();
    this.__events = events;
    this.__calendarGrid = null;
    this.__updateFunction = updateFunction;
    this.__createCalendar();
    this.__firstSetup();
  }

  /* Setup */

  __monthNameByNumber = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  __firstSetup() {
    this.__changeHeaderDaysByDate(this.__today);
    this.__setMonthNameByweek(this.__today);
    this.__setButtonEvent(this.__todayButton, this.__resetToToday);
    this.__setButtonEvent(this.__leftButton, this.__calendarBack);
    this.__setButtonEvent(this.__rightButton, this.__calendarForward);

    this.__updateFunction(this.__createEventsByWeek.bind(this));
    this.__createEventsByWeek();
  }

  __createCalendar() {
    const header = this.__createCalendarHeader();

    this.__calendar.appendChild(header);

    const calendarGrid = this.__createCalendarMain();

    this.__calendar.appendChild(calendarGrid);
  }

  __createCalendarHeader() {
    const header = this.__calendar.querySelector(
      '.calendar__top-template'
    ).content;

    this.__headerCells = header.querySelectorAll('.calendar__top-cell');

    return header;
  }

  __createCalendarMain() {
    const calendarGrid =
      this.__calendar.querySelector('.calendar-template').content;
    const hourCellsContainer = calendarGrid.querySelector(
      '.calendar__hour-cells-container'
    );

    const hourCell = calendarGrid.querySelector('.calendar__hour-cell');
    this.__createHourCells(hourCellsContainer, hourCell);

    const hourCells = calendarGrid.querySelectorAll('.calendar__hour-cell');
    this.__fillHourCellsTime(hourCells);

    this.__calendarGrid = calendarGrid.querySelector('.calendar-grid');
    const gridCell = this.__calendarGrid.querySelector('.calendar-grid__cell');
    this.__createCalendarGrid(this.__calendarGrid, gridCell);
    return calendarGrid;
  }

  __createHourCells(container, element) {
    for (let i = 0; i < 22; i++) {
      const clonedElement = element.cloneNode(true);
      container.appendChild(clonedElement);
    }
  }

  __fillHourCellsTime(elements) {
    for (let i = 0; i < elements.length; i++) {
      let text = elements[i].querySelector('.calendar__hour-text');
      let end = i < 12 ? 'AM' : 'PM';
      text.innerHTML = `${(i % 12) + 1} ${end}`;
    }
  }

  __createCalendarGrid(grid, cell) {
    for (let i = 0; i < 167; i++) {
      const clonedCell = cell.cloneNode(false);
      grid.appendChild(clonedCell);
    }
  }

  /* Header */

  __changeHeaderDaysByDate(givenDate) {
    let date = this.__getWeekSundayFromDate(givenDate);

    for (let i = 0; i < this.__headerCells.length; i++) {
      const textNode = this.__headerCells[i].querySelector(
        '.calendar__top-cell-day'
      );
      const numberNode = this.__headerCells[i].querySelector(
        '.calendar__top-cell-day-number'
      );

      if (this.__checkIfDateIsToday(date)) {
        textNode.classList.add('calendar__top-cell--colored');
        numberNode.classList.add('calendar__top-cell--colored-circle');
      } else {
        textNode.classList.remove('calendar__top-cell--colored');
        numberNode.classList.remove('calendar__top-cell--colored-circle');
      }

      numberNode.innerHTML = date.getDate();
      date.setDate(date.getDate() + 1);
    }
  }

  /* Functionality */

  __calendarMove() {
    this.__createEventsByWeek();
    const dateByOffset = new Date(
      this.__today.getFullYear(),
      this.__today.getMonth(),
      this.__today.getDate() + this.__weekOffset * 7
    );
    this.__changeHeaderDaysByDate(dateByOffset);
    this.__setMonthNameByweek(dateByOffset);
  }

  __calendarBack() {
    this.__weekOffset--;
    this.__calendarMove();
  }

  __calendarForward() {
    this.__weekOffset++;
    this.__calendarMove();
  }

  __resetToToday() {
    this.__weekOffset = 0;
    this.__createEventsByWeek();
    this.__changeHeaderDaysByDate(this.__today);

    this.__setMonthNameByweek(this.__today);
  }

  __setMonthNameByweek(date) {
    const firstWeekDay = this.__getWeekSundayFromDate(date);
    const lastWeekDay = new Date(
      firstWeekDay.getFullYear(),
      firstWeekDay.getMonth(),
      firstWeekDay.getDate() + 6
    );
    if (firstWeekDay.getMonth() === lastWeekDay.getMonth()) {
      this.__monthText.innerHTML = `${
        this.__monthNameByNumber[firstWeekDay.getMonth()]
      }`;
      return;
    }
    const firstMonthName = this.__monthNameByNumber[
      firstWeekDay.getMonth()
    ].slice(0, 3);
    const secondMonthName = this.__monthNameByNumber[
      lastWeekDay.getMonth()
    ].slice(0, 3);

    this.__monthText.innerHTML = `${firstMonthName} - ${secondMonthName}`;
  }

  /* Utils */

  __getWeekSundayFromDate(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay()
    );
  }

  __checkIfDateIsToday(date) {
    return (
      date.getFullYear() === this.__today.getFullYear() &&
      date.getMonth() === this.__today.getMonth() &&
      date.getDate() === this.__today.getDate()
    );
  }

  __setButtonEvent(button, func) {
    button.addEventListener('click', () => {
      func.call(this);
    });
  }

  /* Events */

  __createEventsByWeek() {
    this.__removePreviousEvents();
    const dateByOffset = new Date(
      this.__today.getFullYear(),
      this.__today.getMonth(),
      this.__today.getDate() + this.__weekOffset * 7
    );

    this.__events.forEach((event) => {
      event.createEvents(dateByOffset, this.__calendarGrid);
    });
  }

  __removePreviousEvents() {
    const events = this.__calendarGrid.querySelectorAll('.calendar__event');
    events.forEach((event) => {
      this.__calendarGrid.removeChild(event);
    });
  }
}
