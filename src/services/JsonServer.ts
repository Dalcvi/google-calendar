import { CalendarEvent } from '../Classes/CalendarEvent';

const url = 'http://localhost:4000';

export const fetchEvents = async (): Promise<Response> => {
  return fetch(url + '/events');
};

export const saveEvent = async (
  calendarEvent: CalendarEvent
): Promise<Response> => {
  return fetch(url + '/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(calendarEvent.getAll()),
  });
};

export const deleteEvent = async (id: number): Promise<Response> => {
  return fetch(url + '/events/' + id, {
    method: 'DELETE',
  });
};
