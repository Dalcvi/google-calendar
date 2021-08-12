import { EventsActionTypes } from './actionTypes/EventsActionTypes';
import { EventsActions } from './actions/EventsActions';
import { CalendarEvent } from '../Classes/CalendarEvent';

export interface EventsState {
  events: CalendarEvent[];
}
const initialState = {
  events: [],
};

export const eventsReducer = (
  state: EventsState = initialState,
  action: EventsActions
) => {
  switch (action.type) {
    case EventsActionTypes.ADD_EVENT: {
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    }
    case EventsActionTypes.ADD_EVENTS: {
      return {
        ...state,
        events: [...state.events, ...action.payload],
      };
    }
    default:
      return state;
  }
};
