import { SidebarModel } from '../Models/SidebarModel';
import { Component } from './Component';

export class Sidebar extends Component<SidebarModel> {
  template(): string {
    return `
        <button class="btn-round event-btn">Create Event</button>
        `;
  }

  toggleSidebar = (): void => {
    this.parentElement.classList.toggle('sidebar--closed');
  };
}
