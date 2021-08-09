import { store } from '../../..';
import { CalendarModel } from '../../../Models/CalendarModel';
import { EventModel } from '../../../Models/EventModel';
import { EventsModel } from '../../../Models/EventsModel';
import { Component, RegionsMap } from '../../Component';
import { CalendarEvent } from './CalendarEvent';

export class CalendarEventContainer extends Component {
  private eventsModel: EventsModel;
  private calendarModel: CalendarModel;
  private currentWeekEvents: EventModel[];

  constructor(parentElement: Element) {
    super(parentElement);

    this.eventsModel = store.events;
    this.calendarModel = store.calendar;
    this.bindModel(this.eventsModel);
    this.bindModel(this.calendarModel);

    this.currentWeekEvents = [];

    this.regionsMap = this.createRegionsMap();
  }

  template(): string {
    this.currentWeekEvents = this.getThisWeeksEvents();

    const eventElementString = '<div class="event"></div>';

    let eventElementsStrings = '';

    this.currentWeekEvents.forEach(() => {
      eventElementsStrings += eventElementString;
    });

    return `
        ${eventElementsStrings}
    `;
  }

  createRegionsMap(): RegionsMap {
    return {
      events: '.event',
    };
  }

  mapRegions(fragment: DocumentFragment): void {
    for (let key in this.regionsMap) {
      const selector = this.regionsMap[key];
      const elements = fragment.querySelectorAll(selector);
      if (elements) {
        this.regions[key] = elements;
      }
    }
  }

  onRender(): void {
    if (!this.isListOfElements(this.regions.events)) {
      return;
    }

    this.regions.events.forEach((element: Element, index: number) => {
      new CalendarEvent(
        element,
        this.currentWeekEvents[index],
        this.calendarModel.getCurrentWeekStart()
      ).render();
    });
  }

  getThisWeeksEvents(): EventModel[] {
    const events = this.eventsModel.get('events');
    if (!events) {
      return [];
    }

    const weekStart = this.calendarModel.getCurrentWeekStart();
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return events.filter((event) =>
      event.isEventIntersectingDates(weekStart, weekEnd)
    );
  }
}
