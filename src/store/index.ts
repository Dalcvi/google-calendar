import { combineReducers } from 'redux';
import { CalendarState, calendarReducer } from './CalendarReducer';
import { eventsReducer, EventsState } from './EventsReducer';
import { miniCalendarReducer, MiniCalendarState } from './MiniCalendarReducer';

export interface AppState {
  calendar: CalendarState;
  miniCalendar: MiniCalendarState;
  events: EventsState;
}

export const reducers = combineReducers({
  calendar: calendarReducer,
  miniCalendar: miniCalendarReducer,
  events: eventsReducer,
});
