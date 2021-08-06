import { Sidebar } from './Components/Sidebar';
import { Header } from './Components/Header';
import { Calendar } from './Components/Calendar/Calendar';
import { EventButton } from './Components/EventButton';
import { Modal } from './Components/Modal/Modal';
import { store } from '.';
import { fetchEvents } from './Services/localSession';

export class App {
  private header: Header;
  private sidebar: Sidebar;
  private calendar: Calendar;
  private eventButton: EventButton;
  private modal: Modal;

  constructor() {
    store.events.addEventsToList(fetchEvents());

    this.header = new Header(this.getElement('.header'));
    this.sidebar = new Sidebar(this.getElement('.sidebar'));
    this.calendar = new Calendar(this.getElement('.calendar'));
    this.eventButton = new EventButton(
      this.getElement('.event-button--container')
    );
    this.modal = new Modal(this.getElement('.modal-container'));

    this.render();
  }

  getElement(selector: string): Element {
    const element = document.querySelector(selector);

    if (!element) {
      throw new Error(`Element by selector: ${selector} is missing!`);
    }
    return element;
  }

  render() {
    this.header.render();
    this.sidebar.render();
    this.calendar.render();
    this.eventButton.render();
    this.modal.render();
  }
}
