import { Component } from '../../Component';
import { CalendarHeaderCell } from './CalendarHeaderCell';

export class CalendarHeader extends Component {
  constructor(parentElement: Element) {
    super(parentElement);

    this.regionsMap = {
      CalendarHeaderCell: '.calendar__top-cell',
    };
  }

  template(): string {
    const headerCellElementString = '<li class="calendar__top-cell"></li>';

    const daysInAWeek = 7;

    let cellElementsStrings = '';

    for (let i = 0; i < daysInAWeek; i++) {
      cellElementsStrings += headerCellElementString;
    }

    return `
            <aside class="calendar__top-hour-cell">
              <span class="text--size-small text--color-secondary">gmt+03</span>
            </aside>
            <ul
              class="calendar__top-cells list-s-type-none text--color-secondary"
            >
              ${cellElementsStrings}
            </ul>
    `;
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
    if (!this.isListOfElements(this.regions.CalendarHeaderCell)) {
      return;
    }

    this.regions.CalendarHeaderCell.forEach((element, index) => {
      new CalendarHeaderCell(element, index).render();
    });
    // new MiniCalGrid(this.regions.miniCalGrid).render();
  }
}
