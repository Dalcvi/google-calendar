import { CalendarEvent } from '../../Classes/CalendarEvent';
import { EventsActionTypes } from '../actionTypes/EventsActionTypes';

interface AddEvent {
  type: EventsActionTypes.ADD_EVENT;
  payload: CalendarEvent;
}

interface AddEvents {
  type: EventsActionTypes.ADD_EVENTS;
  payload: CalendarEvent[];
}

export const EventsActionCreators = {
  AddEvent: (payload: CalendarEvent): AddEvent => ({
    type: EventsActionTypes.ADD_EVENT,
    payload,
  }),
  AddEvents: (payload: CalendarEvent[]): AddEvents => ({
    type: EventsActionTypes.ADD_EVENTS,
    payload,
  }),
};

export type EventsActions = AddEvent | AddEvents;
