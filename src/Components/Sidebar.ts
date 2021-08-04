import { store } from '..';
import { CalendarModel } from '../Models/CalendarModel';
import { Model } from '../Models/Model';
import { SidebarModel } from '../Models/SidebarModel';
import { Component, RegionsMap } from './Component';
import { MiniCalendar } from './Mini Calendar/MiniCalendar';

export class Sidebar extends Component {
  private sidebarModel: SidebarModel;

  constructor(parentElement: Element) {
    super(parentElement);

    this.sidebarModel = store.sidebar;

    this.bindModel(store.sidebar);

    this.sidebarModel.addEvent('toggle', this.toggleSidebar);

    this.regionsMap = this.createRegionsMap();
  }

  createRegionsMap(): RegionsMap {
    return {
      eventButtonContainer: '.event-button--container',
      miniCalendar: '.mini-calendar',
    };
  }

  template(): string {
    return `
    <div class="event-button--container"></div>
    <section class="mini-calendar"></section>
    `;
  }

  onRender(): void {
    new MiniCalendar(this.regions.miniCalendar).render();
  }

  toggleSidebar = (): void => {
    this.parentElement.classList.toggle('sidebar--closed');
  };
}
