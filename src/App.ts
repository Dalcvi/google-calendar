// import { Header } from './Components/Header';
// import { MiniCalendar } from './Components/Mini Calendar/MiniCalendar';
import { Sidebar } from './Components/Sidebar';
import { Component } from './Components/Component';
import { Header } from './Components/Header';

export class App {
  private header: Header;
  private sidebar: Sidebar;
  constructor() {
    this.header = new Header(this.getElement('.header'));
    this.sidebar = new Sidebar(this.getElement('.sidebar'));
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
  }

  // const header = new Header(headerElement, calendarModel);
  // const sidebar = new Sidebar(sidebarElement, sidebarModel);

  // header.render();
  // sidebar.render();
}
