import { getDateString } from '../Utils/dates';

export interface CalendarEventProps {
  id?: number;
  title: string;
  startingDate: Date;
  endingDate: Date;
  description: string;
  positions: CalendarEventPositionsByDay;
}

export interface CalendarEventPosition {
  top: number;
  height: number;
}

export interface CalendarEventPositionsByDay {
  [key: string]: CalendarEventPosition;
}

export class CalendarEvent {
  private data: CalendarEventProps;

  static createEventWithIdFromObject(
    object: CalendarEventProps
  ): CalendarEvent {
    return new CalendarEvent(
      object.title,
      new Date(object.startingDate),
      new Date(object.endingDate),
      object.description,
      object.id
    );
  }

  static isCalendarEvent(object: any): object is CalendarEventProps {
    const eventPropTemplate = {
      id: 0,
      title: '',
      startingDate: new Date(),
      endingDate: new Date(),
      description: '',
      positions: {
        top: 0,
        height: 0,
      },
    };
    for (let key in eventPropTemplate) {
      if (object[key] === undefined) {
        return false;
      }
    }
    return true;
  }

  constructor(
    title: string,
    startingDate: Date,
    endingDate: Date,
    description: string,
    id?: number
  ) {
    this.data = {
      title,
      startingDate,
      endingDate,
      description,
      id: id ?? undefined,
      positions: this.getPositionsByDay(startingDate, endingDate),
    };
  }

  get<K extends keyof CalendarEventProps>(key: K): CalendarEventProps[K] {
    return this.data[key];
  }

  getAll(): CalendarEventProps {
    return this.data;
  }

  isEventIntersectingDates(dateStart: Date, dateEnd: Date): boolean {
    return (
      this.data.startingDate <= dateEnd && this.data.endingDate >= dateStart
    );
  }

  getPositionsInRange(
    startingDate: Date,
    endingDate: Date
  ): CalendarEventPositionsByDay {
    if (!this.data.positions) {
      return {};
    }

    const positionsInRange: CalendarEventPositionsByDay = {};

    for (
      let date = new Date(startingDate);
      date <= endingDate;
      date.setDate(date.getDate() + 1)
    ) {
      const stringDate = getDateString(date);

      if (this.data.positions[stringDate]) {
        positionsInRange[stringDate] = this.data.positions[stringDate];
      }
    }

    return positionsInRange;
  }

  getPositionsByDay(
    startingDate: Date,
    endingDate: Date
  ): CalendarEventPositionsByDay {
    let date = new Date(startingDate);
    const positions: CalendarEventPositionsByDay = {};

    let fullHeight = this.getMinutesBetweenDates(endingDate, startingDate);

    if (fullHeight === 0) {
      fullHeight = 1;
    }
    let minutesFromTop =
      startingDate.getHours() * 60 + startingDate.getMinutes();

    while (fullHeight > 0) {
      let dayHeight = this.getDayHeight(minutesFromTop, fullHeight);

      positions[getDateString(date)] = {
        top: minutesFromTop,
        height: dayHeight,
      };

      minutesFromTop = 0;
      date.setDate(date.getDate() + 1);
      fullHeight -= dayHeight;
    }

    return positions;
  }

  getMinutesBetweenDates(date1: Date, date2: Date): number {
    return (date1.getTime() - date2.getTime()) / 60000;
  }

  getDayHeight(fromTop: number, height: number): number {
    const pixelsInDay = 24 * 60;

    if (pixelsInDay - fromTop - height > 0) {
      return height;
    }

    return pixelsInDay - fromTop;
  }
}
