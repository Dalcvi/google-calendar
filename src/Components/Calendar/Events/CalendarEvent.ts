import { store } from '../../..';
import { CalendarModel } from '../../../Models/CalendarModel';
import { EventModel, EventPosition } from '../../../Models/EventModel';
import { EventsModel } from '../../../Models/EventsModel';
import { calculateDayDifference } from '../../../Utils/dates';
import { Component, RegionsMap } from '../../Component';

export class CalendarEvent extends Component {
  constructor(
    parentElement: Element,
    private eventModel: EventModel,
    private firstWeekDayDate: Date
  ) {
    super(parentElement);
  }

  template(): string {
    const eventElementsStrings = this.createTemplateStrings();

    return `
        ${eventElementsStrings}
    `;
  }

  createTemplateStrings(): string {
    const lastWeekDayDate = new Date(this.firstWeekDayDate);
    lastWeekDayDate.setDate(lastWeekDayDate.getDate() + 6);

    const positionsThisWeek = this.eventModel.getPositionsInRange(
      this.firstWeekDayDate,
      lastWeekDayDate
    );

    const positions = this.eventModel.get('positions') || {};

    const oneColumnWidth = 100 / 7;
    console.log();

    let eventElementsStrings = '';

    let eventTextElementString = `<p>
    <strong>${this.eventModel.get('title')}</strong>,
    ${this.eventModel.get('description')}
    </p>
    `;

    for (let date in positionsThisWeek) {
      const daysSinceSunday = calculateDayDifference(
        this.firstWeekDayDate,
        new Date(date)
      );
      const minutesInADay = 24 * 60;

      const positionByDate: EventPosition = positions[date] || {
        top: 0,
        height: 0,
      };

      if (minutesInADay - positionByDate.top < 24) {
        positionByDate.top = minutesInADay - 24;
        positionByDate.height = 24;
      }

      console.log(positionByDate.height / minutesInADay);

      const eventElementString = `<div class="calendar__event" style="
        top: ${(positionByDate.top / minutesInADay) * 100}%;
        height: ${(positionByDate.height / minutesInADay) * 100}%;
        left:calc(100%/7 * ${daysSinceSunday});
        width:calc(100%/7 - 15px);">
          ${eventTextElementString}
        </div>`;
      eventElementsStrings += eventElementString;
      eventTextElementString = '';
    }

    return eventElementsStrings;
  }
}
