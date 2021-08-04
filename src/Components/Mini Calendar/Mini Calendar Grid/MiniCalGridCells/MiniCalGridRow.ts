import { Component } from '../../../Component';
import { MiniCalGridCell } from './MiniCalGridCell';

export class MiniCalGridRow extends Component {
  private rowStartingDate: Date;

  constructor(parentElement: Element, rowStartingDate: Date) {
    super(parentElement);

    this.rowStartingDate = rowStartingDate;

    this.regionsMap = {
      miniCalGridRow: '.mini-calendar__cell',
    };
  }

  template(): string {
    const cellElementString = '<li class="mini-calendar__cell"></li>';
    const cellAmount = 7;

    let templateString = '';

    for (let i = 0; i < cellAmount; i++) {
      templateString += cellElementString;
    }

    return templateString;
  }

  mapRegions(fragment: DocumentFragment): void {
    for (let key in this.regionsMap) {
      const selector = this.regionsMap[key];
      const elements = fragment.querySelectorAll(selector);
      if (elements) {
        this.regions[key] = elements;
      }
    }
  }

  onRender(): void {
    if (!this.isListOfElements(this.regions.miniCalGridRow)) {
      return;
    }

    this.regions.miniCalGridRow.forEach((element, index) => {
      const cellDate = new Date(this.rowStartingDate.getTime());
      cellDate.setDate(cellDate.getDate() + index);
      new MiniCalGridCell(element, cellDate).render();
    });
  }
}
