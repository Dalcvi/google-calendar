import { CalendarModel } from './CalendarModel';
import { EventsModel } from './EventsModel';
import { MiniCalendarModel } from './MiniCalendarModel';
import { ModalModel } from './ModalModel';
import { SidebarModel } from './SidebarModel';

interface Models {
  calendar: CalendarModel;
  miniCalendar: MiniCalendarModel;
  sidebar: SidebarModel;
  modal: ModalModel;
  events: EventsModel;
}

export class Store implements Models {
  public calendar;
  public miniCalendar;
  public sidebar;
  public modal;
  public events;

  constructor() {
    this.calendar = new CalendarModel();
    this.miniCalendar = new MiniCalendarModel();
    this.sidebar = new SidebarModel();
    this.modal = new ModalModel();
    this.events = new EventsModel();
  }
}
