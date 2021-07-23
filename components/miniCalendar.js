class MiniCalendar {
  constructor(miniCalendar, todayButton) {
    this.__todayButton = todayButton;
    this.__miniCalendar = miniCalendar;
    this.__today = new Date();
    this.__headerText = null;
    this.__leftButton = null;
    this.__rightButton = null;
    this.__gridRows = [];
    this.__monthOffset = 0;
    this.__createCalendar();
    this.__setupStartingCalendarState();
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

  /* Setup */

  __setupStartingCalendarState() {
    this.__changeHeaderTextByDate(this.__today);
    this.__fillGridByMonth(this.__today);
    this.__setupButtonEventListener(this.__leftButton, this.__calendarBack);
    this.__setupButtonEventListener(this.__rightButton, this.__calendarForward);
    this.__setupButtonEventListener(this.__todayButton, this.__resetToToday);
  }

  __createCalendar() {
    const miniCalendarHeader = this.__setupCalendarHeader();

    const miniCalendarGrid = this.__setupCalendarGrid();

    const miniCalendarFragment = new DocumentFragment();

    miniCalendarFragment.appendChild(miniCalendarHeader);
    miniCalendarFragment.appendChild(miniCalendarGrid);

    this.__miniCalendar.appendChild(miniCalendarFragment);
  }

  __setupCalendarHeader() {
    const headerTemplate = this.__miniCalendar.querySelector(
      '.mini-calendar__header-template'
    ).content;

    this.__headerText = headerTemplate.querySelector(
      '.mini-calendar__top-name'
    );
    this.__leftButton = headerTemplate.querySelector(
      '[data-mini-action="left"]'
    );
    this.__rightButton = headerTemplate.querySelector(
      '[data-mini-action="right"]'
    );

    return headerTemplate;
  }

  __setupCalendarGrid() {
    const gridTemplate = this.__miniCalendar.querySelector(
      '.mini-calendar__grid-template'
    ).content;

    const grid = gridTemplate.querySelector('.mini-calendar__grid');
    const templateRows = gridTemplate.querySelectorAll('.mini-calendar__row');
    const firstDayNameRow = templateRows[0];
    const secondDayNumberRow = templateRows[1];

    this.__addRowsToGrid(grid, secondDayNumberRow, 5);

    this.__applyClassSecondaryToRow(firstDayNameRow);

    return gridTemplate;
  }

  __addRowsToGrid(grid, row, amount) {
    this.__gridRows.push(row);
    for (let i = 0; i < amount; i++) {
      const clonedRow = row.cloneNode(true);
      grid.appendChild(clonedRow);

      this.__gridRows.push(clonedRow);
    }
  }

  /* Header Text */

  __changeHeaderTextByDate(date) {
    this.__headerText.innerHTML = `${
      this.__monthNameByNumber[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  /* Mini Calendar Grid */

  __fillGridByMonth(givenDate) {
    let calendarDate = this.__getFirstSunday(givenDate);

    for (let i = 0; i < this.__gridRows.length; i++) {
      const row = this.__gridRows[i];
      this.__fillRowDays(calendarDate, givenDate, row);
    }
  }

  __fillRowDays(calendarDate, givenDate, row) {
    let cells = row.querySelectorAll('.mini-calendar__cell');
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];

      cell.innerHTML = calendarDate.getDate();

      this.__checkIfCurrentMonth(calendarDate, givenDate)
        ? cell.classList.remove('mini-calendar__cell--secondary')
        : cell.classList.add('mini-calendar__cell--secondary');

      this.__checkIfDateIsToday(calendarDate)
        ? cell.classList.add('mini-calendar__cell--colored-circle')
        : cell.classList.remove('mini-calendar__cell--colored-circle');

      calendarDate.setDate(calendarDate.getDate() + 1);
    }
  }

  /* Functionality */

  __setupButtonEventListener(button, func) {
    button.addEventListener('click', () => {
      func.call(this);
      this.__changeCalendar.call(this);
    });
  }

  __calendarBack() {
    this.__monthOffset--;
  }

  __calendarForward() {
    this.__monthOffset++;
  }

  __changeCalendar() {
    const dateWithOffset = this.__dateWithOffset();
    this.__fillGridByMonth(dateWithOffset);
    this.__changeHeaderTextByDate(dateWithOffset);
  }

  __resetToToday() {
    this.__monthOffset = 0;
  }

  /* Utils */

  __applyClassSecondaryToRow(row) {
    const cells = row.querySelectorAll('.mini-calendar__cell');
    for (let i = 0; i < cells.length; i++) {
      this.__applyClassSecondary(cells[i]);
    }
  }

  __applyClassSecondary(cell) {
    cell.classList.add('mini-calendar__cell--secondary');
  }

  __dateWithOffset() {
    return new Date(
      this.__today.getFullYear(),
      this.__today.getMonth() + this.__monthOffset,
      1
    );
  }

  __checkIfCurrentMonth(calendarDate, givenDate) {
    return calendarDate.getMonth() === givenDate.getMonth();
  }

  __checkIfDateIsToday(date) {
    return (
      date.getFullYear() === this.__today.getFullYear() &&
      date.getMonth() === this.__today.getMonth() &&
      date.getDate() === this.__today.getDate()
    );
  }

  __getFirstSunday(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDate() + 1 - date.getDay()
    );
  }
}
