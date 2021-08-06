import { store } from '../..';
import { ModalModel } from '../../Models/ModalModel';
import { EventModel } from '../../Models/EventModel';
import { Callback } from '../../Models/Model';
import {
  calculateDayDifference,
  getDateString,
  getFullDate,
  getTimeString,
} from '../../Utils/dates';
import { Component, EventsMap, RegionsMap } from '../Component';
import { debounce } from '../../Utils/debounce';
import { saveEvents } from '../../Services/localSession';

export class ModalForm extends Component {
  private modalModel: ModalModel;

  constructor(parentElement: Element) {
    super(parentElement);

    this.modalModel = store.modal;

    this.bindModel(this.modalModel);
    this.eventsMap = this.createEventsMap();
  }

  template(): string {
    return `
        <input
              name="title"
              class="modal-form__title-input"
              type="text"
              placeholder="Add title"
              required
            />
            <ul class="list-s-type-none">
              <li class="list--custom-icon mg-t-10">
                <input
                  name="starting-date"
                  class="input"
                  id="starting-date"
                  value="${getDateString(new Date())}"
                  type="date"
                  required
                />
                <input
                  name="starting-hour"
                  class="input-text input--short input"
                  id="starting-hour"
                  value="${getTimeString(new Date())}"
                  type="time"
                  required
                />
              </li>
              <li class="list--custom-icon">
                <input
                  name="ending-date"
                  class="input"
                  id="ending-date"
                  value="${getDateString(new Date())}"
                  type="date"
                  required
                />
                <input
                  name="ending-hour"
                  class="input-text input--short input"
                  id="ending-hour"
                  value="${getTimeString(new Date())}"
                  type="time"
                  required
                />
              </li>
              <li class="list--custom-icon">
                <textarea
                  name="description"
                  placeholder="Description"
                  class="modal-form--description"
                ></textarea>
              </li>
            </ul>
            <div class="modal-footer">
              <button class="modal-footer__button" type="submit" class="btn">
                Save
              </button>
            </div>
    `;
  }

  createEventsMap(): EventsMap {
    return {
      'click:.modal-footer__button': [this.onSubmit.bind(this)],
      'change:#starting-date': [this.onDateChange.call(this)],
      'change:#ending-date': [this.onDateChange.call(this)],
      'change:#starting-hour': [this.onHourChange.call(this)],
      'change:#ending-hour': [this.onHourChange.call(this)],
    };
  }

  onSubmit(event: Event | undefined): void {
    if (!event) {
      return;
    }

    event.preventDefault();

    const formData = (this.parentElement as HTMLFormElement).elements;

    const title = (formData.namedItem('title') as HTMLInputElement).value;
    const startingDate = (
      formData.namedItem('starting-date') as HTMLInputElement
    ).value;
    const startingHour = (
      formData.namedItem('starting-hour') as HTMLInputElement
    ).value;
    const endingDate = (formData.namedItem('ending-date') as HTMLInputElement)
      .value;
    const endingHour = (formData.namedItem('ending-hour') as HTMLInputElement)
      .value;
    const description = (formData.namedItem('description') as HTMLInputElement)
      .value;

    const fullStartingDate = getFullDate(startingDate, startingHour);
    const fullEndingDate = getFullDate(endingDate, endingHour);

    store.events.addEventToList(
      new EventModel(title, fullStartingDate, fullEndingDate, description)
    );

    saveEvents(store.events);

    store.modal.close();
  }

  onDateChange() {
    const onChange = (): void => {
      const formData = (this.parentElement as HTMLFormElement).elements;
      const startingDateElement = formData.namedItem(
        'starting-date'
      ) as HTMLInputElement;
      const endingDateElement = formData.namedItem(
        'ending-date'
      ) as HTMLInputElement;

      if (
        calculateDayDifference(
          new Date(startingDateElement.value),
          new Date(endingDateElement.value)
        ) > 0
      ) {
        return;
      }

      endingDateElement.setAttribute(
        'min',
        getDateString(new Date(startingDateElement.value))
      );
      endingDateElement.value = startingDateElement.value;
    };
    return debounce(onChange, 500);
  }

  onHourChange() {
    const onChange = (): void => {
      const formData = (this.parentElement as HTMLFormElement).elements;
      const startingDateElement = formData.namedItem(
        'starting-date'
      ) as HTMLInputElement;
      const endingDateElement = formData.namedItem(
        'ending-date'
      ) as HTMLInputElement;
      const startingHourElement = formData.namedItem(
        'starting-hour'
      ) as HTMLInputElement;
      const endingHourElement = formData.namedItem(
        'ending-hour'
      ) as HTMLInputElement;

      if (startingDateElement.value !== endingDateElement.value) {
        return;
      }
      const [startingHour, startingMinutes] =
        startingHourElement.value.split(':');
      const [endingHour, endingMinutes] = endingHourElement.value.split(':');
      if (
        startingHour < endingHour ||
        (startingHour === endingHour && startingMinutes <= endingMinutes)
      ) {
        return;
      }
      endingHourElement.value = startingHourElement.value;
    };
    return debounce(onChange, 500);
  }
}
