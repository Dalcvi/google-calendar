import { getFirstDayOfWeek, getMonthName } from '../Utils/dates';
import { Model } from './Model';

export interface MiniCalendarProps {
  monthOffset?: number;
  today?: Date;
}

export class MiniCalendarModel extends Model<MiniCalendarProps> {
  constructor() {
    super({ monthOffset: 0, today: new Date() });
  }

  setToToday = () => {
    this.set({ monthOffset: 0 });
  };

  goOneMonthBack = (): void => {
    if (this.data.monthOffset === undefined) return;

    this.set({ monthOffset: this.data.monthOffset - 1 });
  };

  goOneMonthForward = (): void => {
    if (this.data.monthOffset === undefined) return;
    this.set({ monthOffset: this.data.monthOffset + 1 });
  };

  getCurrentMonthDate(): Date {
    if (!this.data.today) {
      throw new Error(`Mini Calendar doesn't have today object!`);
    }

    if (this.data.monthOffset === undefined) {
      throw new Error(`Mini Calendar doesn't have month offset!`);
    }

    const today = this.data.today;
    return new Date(
      today.getFullYear(),
      today.getMonth() + this.data.monthOffset,
      1
    );
  }

  getCurrentMonthTitle(): string {
    return getMonthName(this.getCurrentMonthDate());
  }

  getCalendarFirstDayDate(): Date {
    return getFirstDayOfWeek(this.getCurrentMonthDate());
  }
}
