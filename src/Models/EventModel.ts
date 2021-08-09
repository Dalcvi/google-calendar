import { getDateString } from '../Utils/dates';
import { Model } from './Model';

export interface EventProps {
  title: string;
  startingDate: Date;
  endingDate: Date;
  description: string;
  positions?: EventPositionsByDay;
}

export interface EventPosition {
  top: number;
  height: number;
}

export interface EventPositionsByDay {
  [key: string]: EventPosition;
}

export class EventModel extends Model<EventProps> {
  static fromJsonObject(jsonObject: { data: EventProps }): EventModel {
    return new EventModel(
      jsonObject.data.title,
      new Date(jsonObject.data.startingDate),
      new Date(jsonObject.data.endingDate),
      jsonObject.data.description
    );
  }

  constructor(
    title: string,
    startingDate: Date,
    endingDate: Date,
    description: string
  ) {
    super({
      title,
      startingDate,
      endingDate,
      description,
    });

    Object.assign(this.data, {
      positions: this.getPositionsByDay(
        this.data.startingDate,
        this.data.endingDate
      ),
    });
  }

  getAll(): EventProps {
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
  ): EventPositionsByDay {
    if (!this.data.positions) {
      return {};
    }

    const positionsInRange: EventPositionsByDay = {};

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

  getPositionsByDay(startingDate: Date, endingDate: Date): EventPositionsByDay {
    let date = new Date(startingDate);
    const positions: EventPositionsByDay = {};

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
