import { Component } from '../../Component';
import { MiniCalGridCellsContainer } from './MiniCalGridCells/MiniCalGridCellsContainer';
import { MiniCalGridHeader } from './MiniCalGridHeader';

export class MiniCalGrid extends Component {
  constructor(parentElement: Element) {
    super(parentElement);

    this.regionsMap = {
      miniCalGridHeader: '.mini-calendar-grid__header',
      miniCalGridContainer: '.mini-calendar-grid__container',
    };
  }

  template(): string {
    return `
    <header class="mini-calendar-grid__header mini-calendar__row"></header>
    <div class="mini-calendar-grid__container"></div>
    `;
  }

  onRender(): void {
    if (
      !this.isElement(this.regions.miniCalGridHeader) ||
      !this.isElement(this.regions.miniCalGridContainer)
    ) {
      return;
    }

    new MiniCalGridHeader(this.regions.miniCalGridHeader).render();
    new MiniCalGridCellsContainer(this.regions.miniCalGridContainer).render();
  }
}
