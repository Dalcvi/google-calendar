import { Component } from '../../Component';

export class CalendarHours extends Component {
  constructor(parentElement: Element) {
    super(parentElement);

    this.regionsMap = {
      CalendarHours: '.calendar__hour-cells',
      CalendarGrid: '.calendar-grid',
    };
  }

  template(): string {
    const shownHoursAmount = 23;

    let cellElementsStrings = '';

    for (let i = 1; i <= shownHoursAmount; i++) {
      const hour = this.convert24HourClockTimeTo12String(i);

      const hourCellElementString = `<li class="calendar__hour-cell">
                                      <span class="calendar__hour-text">${hour}</span>
                                    </li>`;

      cellElementsStrings += hourCellElementString;
    }

    return `
        <ul class="calendar__hour-cells-container">
        ${cellElementsStrings}
        </ul>
    `;
  }

  convert24HourClockTimeTo12String(hour: number): string {
    const date = new Date();

    date.setHours(hour);

    const options = { hour: 'numeric' as 'numeric', hour12: true };

    return new Intl.DateTimeFormat('en-LT', options).format(date);
  }

  onRender(): void {
    if (
      !this.isElement(this.regions.CalendarHours) ||
      !this.isElement(this.regions.CalendarGrid)
    ) {
      return;
    }

    new CalendarHours(this.regions.CalendarHours).render();
    // new MiniCalGrid(this.regions.miniCalGrid).render();
  }
}
