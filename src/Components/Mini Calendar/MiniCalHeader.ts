import { store } from '../..';
import { MiniCalendarModel } from '../../Models/MiniCalendarModel';
import { Component, EventsMap } from '../Component';

export class MiniCalHeader extends Component {
  private miniCalendarModel: MiniCalendarModel;
  constructor(parentElement: Element) {
    super(parentElement);

    this.miniCalendarModel = store.miniCalendar;

    this.bindModel(this.miniCalendarModel);

    this.eventsMap = this.createEventsMap();
  }

  template(): string {
    return `
    <h3 class="mini-calendar__top-name">${this.miniCalendarModel.getCurrentMonthTitle()}</h3>
              <div class="mini-calendar__movement-buttons">
                <button
                  class="btn mini-calendar__movement-button left-arrow"
                  data-mini-action="left"
                ></button>
                <button
                  class="btn mini-calendar__movement-button right-arrow"
                  data-mini-action="right"
                ></button>
              </div>
    `;
  }

  createEventsMap(): EventsMap {
    return {
      'click:.left-arrow': [this.miniCalendarModel.goOneMonthBack],
      'click:.right-arrow': [this.miniCalendarModel.goOneMonthForward],
    };
  }
}
