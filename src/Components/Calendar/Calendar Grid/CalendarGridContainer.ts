import { Component } from '../../Component';
import { CalendarEventContainer } from '../Events/CalendarEventContainer';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHours } from './CalendarHours';

export class CalendarGridContainer extends Component {
  constructor(parentElement: Element) {
    super(parentElement);

    this.regionsMap = {
      CalendarHours: '.calendar__hour-cells',
      CalendarGrid: '.calendar-grid',
      CalendarEventContainer: '.calendar-event-container',
    };
  }

  template(): string {
    return `
    <aside class="calendar__hour-cells"></aside>
    <div class="calendar-grid-container">
        <ul class="calendar-grid"></ul>
        <div class="calendar-event-container"></div>
    </div>
    `;
  }

  onRender(): void {
    if (
      !this.isElement(this.regions.CalendarHours) ||
      !this.isElement(this.regions.CalendarGrid) ||
      !this.isElement(this.regions.CalendarEventContainer)
    ) {
      return;
    }

    new CalendarHours(this.regions.CalendarHours).render();
    new CalendarGrid(this.regions.CalendarGrid).render();
    new CalendarEventContainer(this.regions.CalendarEventContainer).render();
  }
}
