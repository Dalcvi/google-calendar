import { store } from '../..';
import { Component } from '../Component';
import { CalendarGridContainer } from './Calendar Grid/CalendarGridContainer';
import { CalendarHeader } from './Calendar Header/CalendarHeader';
import { CalendarEventContainer } from './Events/CalendarEventContainer';

export class Calendar extends Component {
  constructor(parentElement: Element) {
    super(parentElement);

    this.regionsMap = {
      CalendarHeader: '.calendar__top',
      CalendarContainer: '.calendar__container',
    };
  }

  template(): string {
    return `
    <header class="calendar__top"></header>
    <div class="calendar__container"></div>
    `;
  }

  onRender(): void {
    if (
      !this.isElement(this.regions.CalendarHeader) ||
      !this.isElement(this.regions.CalendarContainer)
    ) {
      return;
    }

    new CalendarHeader(this.regions.CalendarHeader).render();
    new CalendarGridContainer(this.regions.CalendarContainer).render();
  }
}
