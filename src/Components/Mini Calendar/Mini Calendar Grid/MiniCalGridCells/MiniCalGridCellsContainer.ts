import { store } from '../../../..';
import {
  MiniCalendarModel,
  MiniCalendarProps,
} from '../../../../Models/MiniCalendarModel';
import { getFirstDayOfWeek } from '../../../../Utils/dates';
import { Component } from '../../../Component';
import { MiniCalGridRow } from './MiniCalGridRow';

export class MiniCalGridCellsContainer extends Component {
  private miniCalendarModel: MiniCalendarModel;

  constructor(parentElement: Element) {
    super(parentElement);

    this.regions = {};

    this.miniCalendarModel = store.miniCalendar;

    this.bindModel(this.miniCalendarModel);

    this.regionsMap = {
      miniCalGridRow: '.mini-calendar__row',
    };
  }

  template(): string {
    const rowElementString = '<ul class="mini-calendar__row"></ul>';
    const rowAmount = 6;

    let templateString = '';

    for (let i = 0; i < rowAmount; i++) {
      templateString += rowElementString;
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
    const startingDate = this.miniCalendarModel.getCalendarFirstDayDate();

    if (!this.isListOfElements(this.regions.miniCalGridRow)) {
      return;
    }

    this.regions.miniCalGridRow.forEach((element, index) => {
      const rowStartingDate = new Date(startingDate.getTime());
      rowStartingDate.setDate(startingDate.getDate() + 7 * index);
      new MiniCalGridRow(element, rowStartingDate).render();
    });
  }
}
