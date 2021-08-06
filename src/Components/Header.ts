import { CalendarModel } from '../Models/CalendarModel';
import { store } from '../';
import { Component } from './Component';
import { MiniCalendarModel } from '../Models/MiniCalendarModel';
import { SidebarModel } from '../Models/SidebarModel';
import { EventsMap } from './Component';

export class Header extends Component {
  private calendarModel: CalendarModel;
  private miniCalendarModel: MiniCalendarModel;
  private sidebar: SidebarModel;

  constructor(parentElement: Element) {
    super(parentElement);

    this.calendarModel = store.calendar;
    this.miniCalendarModel = store.miniCalendar;
    this.sidebar = store.sidebar;

    this.bindModel(this.calendarModel);

    this.eventsMap = this.createEventsMap();
  }

  template(): string {
    return `
        <button class="hamburger"></button>
        <h1 class="header__title">Calendar</h1>
        <button class="btn-regular header__today" data-main-action="today">
          Today
        </button>
        <div class="header__movement-buttons">
          <button
            class="btn header__movement-button left-arrow"
            data-main-action="left"
          ></button>
          <button
            class="btn header__movement-button right-arrow"
            data-main-action="right"
          ></button>
        </div>
        <h2 class="header__month-title">
          ${this.calendarModel.getCurrentMonthTitle()}
        </h2>
        <button class="btn-regular header__view-button">Week</button>
        `;
  }

  createEventsMap(): EventsMap {
    return {
      'click:.left-arrow': [this.calendarModel.goOneWeekBack],
      'click:.right-arrow': [this.calendarModel.goOneWeekForward],
      'click:.header__today': [this.onTodayButtonClick.bind(this)],
      'click:.hamburger': [this.onHamburgerButtonClick.bind(this)],
    };
  }

  onTodayButtonClick(): void {
    this.calendarModel.setToToday();
    this.miniCalendarModel.setToToday();
  }

  onHamburgerButtonClick(): void {
    this.sidebar.triggerEvent('toggle');
  }
}
