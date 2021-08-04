import { store } from '../..';
import {
  MiniCalendarModel,
  MiniCalendarProps,
} from '../../Models/MiniCalendarModel';
import { Component } from '../Component';
import { MiniCalGrid } from './Mini Calendar Grid/MiniCalGrid';
import { MiniCalHeader } from './MiniCalHeader';

export class MiniCalendar extends Component {
  private miniCalendarModel: MiniCalendarModel;

  constructor(parentElement: Element) {
    super(parentElement);

    this.miniCalendarModel = store.miniCalendar;

    this.regionsMap = {
      miniCalHeader: '.mini-calendar__header',
      miniCalGrid: '.mini-calendar__grid',
    };
  }

  template(): string {
    return `
    <header class="mini-calendar__header"></header>
    <div class="mini-calendar__grid"></div>
    `;
  }

  onRender(): void {
    if (
      !this.isElement(this.regions.miniCalHeader) ||
      !this.isElement(this.regions.miniCalGrid)
    ) {
      return;
    }

    new MiniCalHeader(this.regions.miniCalHeader).render();
    new MiniCalGrid(this.regions.miniCalGrid).render();
  }
}
