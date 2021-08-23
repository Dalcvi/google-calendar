import { EventsActionTypes } from './actionTypes/EventsActionTypes';
import { EventsActions } from './actions/EventsActions';
import { CalendarEvent } from '../Classes/CalendarEvent';

export interface EventsState {
  loading: boolean;
  events: CalendarEvent[];
  error: Error | null;
}
const initialState = {
  loading: false,
  events: [],
  error: null,
};

export const eventsReducer = (
  state: EventsState = initialState,
  action: EventsActions
) => {
  switch (action.type) {
    case EventsActionTypes.DELETE_EVENT_PENDING:
    case EventsActionTypes.GET_EVENTS_PENDING:
    case EventsActionTypes.ADD_EVENT_PENDING: {
      return { ...state, loading: true };
    }
    case EventsActionTypes.GET_EVENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        events: [...state.events, ...action.payload],
        error: null,
      };
    }
    case EventsActionTypes.ADD_EVENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        error: null,
      };
    }
    case EventsActionTypes.ADD_EVENT_FAILURE:
    case EventsActionTypes.GET_EVENTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case EventsActionTypes.DELETE_EVENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        events: state.events.filter(
          (event) => event.get('id') !== action.payload
        ),
        error: null,
      };
    }
    case EventsActionTypes.DELETE_EVENT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
};
