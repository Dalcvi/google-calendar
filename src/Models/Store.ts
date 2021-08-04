import { CalendarModel } from './CalendarModel';
import { MiniCalendarModel } from './MiniCalendarModel';
import { SidebarModel } from './SidebarModel';

interface Models {
  calendar?: CalendarModel;
  miniCalendar?: MiniCalendarModel;
  sidebar?: SidebarModel;
}

export class Store implements Models {
  public calendar;
  public miniCalendar;
  public sidebar;

  constructor() {
    this.calendar = new CalendarModel();
    this.miniCalendar = new MiniCalendarModel();
    this.sidebar = new SidebarModel();
  }

  //   test(): void {
  //     this.calendar.get('');
  //   }
}
