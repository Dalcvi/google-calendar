import { store } from '../../../..';
import { MiniCalendarModel } from '../../../../Models/MiniCalendarModel';
import {
  areDatesTheSame,
  getMonthName,
  isTheSameMonth,
} from '../../../../Utils/dates';
import { Component } from '../../../Component';

export class MiniCalGridCell extends Component {
  private cellDate: Date;
  private miniCalendarModel: MiniCalendarModel;

  constructor(parentElement: Element, cellDate: Date) {
    super(parentElement);

    this.miniCalendarModel = store.miniCalendar;

    this.cellDate = cellDate;
  }

  template(): string {
    return `${this.cellDate.getDate()}`;
  }

  onRender() {
    const today = this.miniCalendarModel.get('today');
    if (!today) {
      throw new Error(`Mini calendar doesn't have today object!`);
    }

    const isToday = areDatesTheSame(this.cellDate, today);
    const isSameMonth = isTheSameMonth(
      this.cellDate,
      this.miniCalendarModel.getCurrentMonthDate()
    );

    this.parentElement.classList.toggle(
      'mini-calendar__cell--colored-circle',
      isToday
    );

    this.parentElement.classList.toggle(
      'mini-calendar__cell--secondary',
      !isSameMonth
    );
  }
}
