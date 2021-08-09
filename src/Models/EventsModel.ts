import { saveEvent } from '../Services/events';
import { EventModel } from './EventModel';
import { Model } from './Model';

export interface EventsList {
  events: EventModel[];
}

export class EventsModel extends Model<EventsList> {
  constructor() {
    super({ events: [] });
  }

  addEventToList(event: EventModel) {
    const updatedEvents = this.data.events;
    updatedEvents.push(event);

    this.set({ events: updatedEvents });
    saveEvent(event);
  }

  addEventsToList(events: EventModel[]) {
    const updatedEvents = [...this.data.events, ...events];

    this.set({ events: updatedEvents });
  }

  clearList(): void {
    this.set({ events: [] });
  }
}
