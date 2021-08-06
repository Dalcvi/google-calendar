import { EventModel, EventProps } from '../Models/EventModel';
import { EventsModel } from '../Models/EventsModel';

const eventsKey = 'events';

export const fetchEvents = (): EventModel[] => {
  const JSONevents = window.localStorage.getItem(eventsKey) ?? '';

  const eventsArray: EventModel[] = [];
  (JSON.parse(JSONevents) as []).forEach((object: { data: EventProps }) => {
    eventsArray.push(EventModel.fromJsonObject(object));
  });
  return eventsArray;
};

export const saveEvents = (eventsModel: EventsModel): void => {
  window.localStorage.setItem(
    eventsKey,
    JSON.stringify(eventsModel.get('events'))
  );
};
