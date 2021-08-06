import { store } from '..';
import { ModalModel } from '../Models/ModalModel';
import { Component, EventsMap, RegionsMap } from './Component';

export class EventButton extends Component {
  private modalModel: ModalModel;

  constructor(parentElement: Element) {
    super(parentElement);

    this.modalModel = store.modal;

    store.sidebar.addEvent('toggle', this.toggleShrinkage.bind(this));
    this.modalModel.addEvent('change', this.toggleDisabled.bind(this));

    this.eventsMap = this.createEventsMap();
    this.regionsMap = this.createRegionsMap();
  }

  template(): string {
    return `
        <button class="btn-round event-btn">Create Event</button>
        `;
  }

  createEventsMap(): EventsMap {
    return {
      'click:.event-btn': [this.showModal.bind(this)],
    };
  }

  createRegionsMap(): RegionsMap {
    return {
      eventButton: '.event-btn',
    };
  }

  showModal() {
    if (!this.isElement(this.regions.eventButton)) {
      return;
    }

    const rect = this.regions.eventButton.getBoundingClientRect();

    const top: string = rect.top + 'px';
    const left: string = rect.right + 10 + 'px';

    this.modalModel.show({ top, left });
  }

  toggleShrinkage(): void {
    if (!this.isElement(this.regions.eventButton)) {
      return;
    }

    this.regions.eventButton.classList.toggle('event-btn--circle');
  }

  toggleDisabled(): void {
    if (!this.isElement(this.regions.eventButton)) {
      return;
    }

    this.regions.eventButton.classList.toggle(
      'event-btn--disabled',
      this.modalModel.get('isOpen')
    );
  }
}
