import { EventModel, EventProps } from '../Models/EventModel';
import 'regenerator-runtime/runtime';

const eventsKey = 'events';

export const fetchEvents = async (): Promise<EventModel[]> => {
  const eventsArray: EventModel[] = [];

  await fetch('http://localhost:3000/events')
    .then((response) => response.json())

    .then((data: EventProps[]) => {
      data.forEach((eventModel: EventProps) => {
        eventsArray.push(
          new EventModel(
            eventModel.title,
            new Date(eventModel.startingDate),
            new Date(eventModel.endingDate),
            eventModel.description
          )
        );
      });
    });

  return eventsArray;
};

export const saveEvent = async (eventModel: EventModel): Promise<void> => {
  await fetch('http://localhost:3000/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventModel.getAll()),
  });
};
