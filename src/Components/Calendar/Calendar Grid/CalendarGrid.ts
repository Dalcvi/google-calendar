import { Component } from '../../Component';

export class CalendarGrid extends Component {
  template(): string {
    const cellElementString = `<li class="calendar-grid__cell"></li>`;
    const daysInAWeek = 7;
    const hoursInADay = 24;

    let cellElementsStrings = '';

    for (let i = 0; i < daysInAWeek * hoursInADay; i++) {
      cellElementsStrings += cellElementString;
    }

    return cellElementsStrings;
  }
}
