import { Dispatch } from 'react';
import { CalendarEvent, CalendarEventProps } from '../Classes/CalendarEvent';
import { EventsActionCreators } from '../store/actions/EventsActions';

const url = 'http://localhost:4000';

export const fetchEvents = async (dispatch: Dispatch<any>): Promise<void> => {
  const eventsArray: CalendarEvent[] = [];

  await fetch(url + '/events')
    .then((response) => response.json())

    .then((data: CalendarEventProps[]) => {
      data.forEach((calendarEvent: CalendarEventProps) => {
        eventsArray.push(
          new CalendarEvent(
            calendarEvent.title,
            new Date(calendarEvent.startingDate),
            new Date(calendarEvent.endingDate),
            calendarEvent.description,
            Number(calendarEvent.id)
          )
        );
      });
    })
    .then(() => {
      dispatch(EventsActionCreators.AddEvents(eventsArray));
    });
};

export const saveEvent = async (
  calendarEvent: CalendarEvent,
  dispatch: Dispatch<any>
): Promise<void> => {
  await fetch(url + '/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(calendarEvent.getAll()),
  })
    .then((response) => response.json())
    .then((calendarEvent: CalendarEventProps) => {
      dispatch(
        EventsActionCreators.AddEvent(
          new CalendarEvent(
            calendarEvent.title,
            new Date(calendarEvent.startingDate),
            new Date(calendarEvent.endingDate),
            calendarEvent.description,
            Number(calendarEvent.id)
          )
        )
      );
    });
};
