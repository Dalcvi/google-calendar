import { store } from '../..';
import { ModalModel } from '../../Models/ModalModel';
import { Component, EventsMap, RegionsMap } from '../Component';
import { ModalForm } from './ModalForm';

export class Modal extends Component {
  private modalModel: ModalModel;

  constructor(parentElement: Element) {
    super(parentElement);

    this.modalModel = store.modal;

    this.bindModel(this.modalModel);
    this.eventsMap = this.createEventsMap();
    this.regionsMap = this.createRegionsMap();

    this.modalModel.addEvent('change', this.toggleModal.bind(this));

    this.toggleModal();

    this.addEventToDocument('click', this.closeModalOnOutsideClick());
  }

  template(): string {
    const isOpen = this.modalModel.get('isOpen');
    const position = this.getPosition();

    if (!isOpen) {
      return '';
    }

    return `
        <section style="top:${position.top}; left:${position.left}" class="modal">
          <header class="modal-header">
            <button class="modal-header__button">&times</button>
          </header>
          <form class="modal-form">
          </form>
        </section>
    `;
  }

  onRender(): void {
    if (!this.isElement(this.regions.form)) {
      return;
    }

    new ModalForm(this.regions.form).render();
  }

  createEventsMap(): EventsMap {
    return {
      'click:.modal-header__button': [this.modalModel.close],
    };
  }

  createRegionsMap(): RegionsMap {
    return {
      form: '.modal-form',
    };
  }

  getPosition(): { top: string; left: string } {
    return this.modalModel.get('position') || { top: '0', left: '0' };
  }

  toggleModal(): void {
    const isOpen = this.modalModel.get('isOpen');

    if (isOpen === undefined) {
      return;
    }

    this.parentElement.classList.toggle('modal-container__hidden', !isOpen);
  }

  closeModalOnOutsideClick(): (e: Event) => void {
    return (event: Event) => {
      const target = event.target;

      if (!target || !(target instanceof Element)) {
        return;
      }

      if (
        this.parentElement.contains(target) ||
        this.parentElement === target
      ) {
        return;
      }
      this.modalModel.close();
    };
  }

  addEventToDocument(eventName: string, callback: (e: Event) => void) {
    document.addEventListener(eventName, callback);
  }
}
