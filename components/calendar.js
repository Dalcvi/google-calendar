class Calendar {
  constructor(calendar, todayButton, monthText, leftButton, rightButton) {
    this.calendar = calendar;
    this.todayButton = todayButton;
    this.monthText = monthText;
    this.leftButton = leftButton;
    this.rightButton = rightButton;
    this.weekOffset = 0;
    this.__headerCells = [];
    this.today = new Date();
    this.__createCalendar();
    this.__firstSetup();
  }

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
    this.__changeHeaderDaysByDate(this.today);
    this.__setMonthNameByweek(this.today);
    this.__setButtonEvent(this.todayButton, this.__resetToToday);
    this.__setButtonEvent(this.leftButton, this.__calendarBack);
    this.__setButtonEvent(this.rightButton, this.__calendarForward);
  }

  __createCalendar() {
    const header = this.__createCalendarHeader();

    this.calendar.appendChild(header);

    const calendarGrid = this.__createCalendarMain();

    this.calendar.appendChild(calendarGrid);
  }

  __createCalendarHeader() {
    const header = this.calendar.querySelector(
      '.calendar__top-template'
    ).content;

    this.__headerCells = header.querySelectorAll('.calendar__top-cell');

    return header;
  }

  __createCalendarMain() {
    const calendarGrid =
      this.calendar.querySelector('.calendar-template').content;
    const hourCellsContainer = calendarGrid.querySelector(
      '.calendar__hour-cells-container'
    );

    const hourCell = calendarGrid.querySelector('.calendar__hour-cell');
    this.__createHourCells(hourCellsContainer, hourCell);

    const hourCells = calendarGrid.querySelectorAll('.calendar__hour-cell');
    this.__fillHourCellsTime(hourCells);

    const grid = calendarGrid.querySelector('.calendar-grid');
    const gridCell = grid.querySelector('.calendar-grid__cell');
    this.__createCalendarGrid(grid, gridCell);
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

  __getWeekSundayFromDate(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay()
    );
  }

  __checkIfDateIsToday(date) {
    return (
      date.getFullYear() === this.today.getFullYear() &&
      date.getMonth() === this.today.getMonth() &&
      date.getDate() === this.today.getDate()
    );
  }

  __setButtonEvent(button, func) {
    button.addEventListener('click', () => {
      func.call(this);
    });
  }

  __calendarBack() {
    this.weekOffset--;
    this.__calendarMove();
  }

  __calendarForward() {
    this.weekOffset++;
    this.__calendarMove();
  }

  __calendarMove() {
    const dateByOffset = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate() + this.weekOffset * 7
    );
    this.__changeHeaderDaysByDate(dateByOffset);
    this.__setMonthNameByweek(dateByOffset);
  }

  __resetToToday() {
    this.weekOffset = 0;
    this.__changeHeaderDaysByDate(this.today);

    this.__setMonthNameByweek(this.today);
  }

  __setMonthNameByweek(date) {
    const firstWeekDay = this.__getWeekSundayFromDate(date);
    const lastWeekDay = new Date(
      firstWeekDay.getFullYear(),
      firstWeekDay.getMonth(),
      firstWeekDay.getDate() + 6
    );
    if (firstWeekDay.getMonth() === lastWeekDay.getMonth()) {
      this.monthText.innerHTML = `${
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

    this.monthText.innerHTML = `${firstMonthName} - ${secondMonthName}`;
  }
}
