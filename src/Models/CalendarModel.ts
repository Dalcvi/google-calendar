import { getMonthName, getMonthTitle } from '../Utils/dates';
import { Model } from './Model';

export interface CalendarProps {
  weekOffset?: number;
  today?: Date;
}

export class CalendarModel extends Model<CalendarProps> {
  constructor() {
    super({ weekOffset: 0, today: new Date() });
  }

  setToToday = (): void => {
    this.set({ ...this.data, weekOffset: 0 });
  };

  goOneWeekBack = (): void => {
    if (this.data.weekOffset === undefined) return;

    this.set({ weekOffset: this.data.weekOffset - 1 });
  };

  goOneWeekForward = (): void => {
    if (this.data.weekOffset === undefined) return;
    this.set({ weekOffset: this.data.weekOffset + 1 });
  };

  getCurrentMonthTitle(): string {
    return getMonthTitle(this.getCurrentWeek());
  }

  getCurrentWeek(): Date {
    const daysInAWeek = 7;
    const today = this.get('today');
    const weekOffset = this.get('weekOffset');

    if (!today || !weekOffset) {
      return new Date();
    }

    const currentWeekDate = new Date(today.getTime());

    currentWeekDate.setDate(
      currentWeekDate.getDate() + weekOffset * daysInAWeek
    );

    return currentWeekDate;
  }
}
