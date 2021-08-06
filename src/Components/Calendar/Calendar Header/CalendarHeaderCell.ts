import { store } from '../../..';
import { CalendarModel } from '../../../Models/CalendarModel';
import {
  areDatesTheSame,
  getFirstDayOfWeek,
  getWeekdayName,
} from '../../../Utils/dates';
import { Component } from '../../Component';

export class CalendarHeaderCell extends Component {
  private calendarModel: CalendarModel;

  constructor(parentElement: Element, private dayId: number) {
    super(parentElement);

    this.calendarModel = store.calendar;

    this.bindModel(this.calendarModel);

    this.regionsMap = {
      cellDayName: '.calendar__top-cell-day',
      cellDayNumber: '.calendar__top-cell-day-number',
    };
  }

  template(): string {
    return `
            <p class="calendar__top-cell-day">${getWeekdayName(
              this.dayId
            ).substr(0, 3)}</p>
            <p class="calendar__top-cell-day-number">${this.getDayNumber()}</p>
    `;
  }

  getDayNumber(): number {
    return this.getDayDate().getDate();
  }

  getDayDate(): Date {
    const date = getFirstDayOfWeek(this.calendarModel.getCurrentWeek());
    date.setDate(date.getDate() + this.dayId);

    return date;
  }

  onRender(): void {
    const today = this.calendarModel.get('today');
    if (
      !this.isElement(this.regions.cellDayName) ||
      !this.isElement(this.regions.cellDayNumber) ||
      !today
    ) {
      return;
    }

    const isDateToday = areDatesTheSame(this.getDayDate(), today);

    this.regions.cellDayName.classList.toggle(
      'calendar__top-cell--colored',
      isDateToday
    );

    this.regions.cellDayNumber.classList.toggle(
      'calendar__top-cell--colored-circle',
      isDateToday
    );
  }
}
