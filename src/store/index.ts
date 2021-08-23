import { combineReducers } from 'redux';
import { CalendarState, calendarReducer } from './CalendarReducer';
import { eventsReducer, EventsState } from './EventsReducer';
import { miniCalendarReducer, MiniCalendarState } from './MiniCalendarReducer';
import { modalReducer, ModalState } from './ModalReducer';

export interface AppState {
  calendar: CalendarState;
  miniCalendar: MiniCalendarState;
  events: EventsState;
  modal: ModalState;
}

export const reducers = combineReducers({
  calendar: calendarReducer,
  miniCalendar: miniCalendarReducer,
  events: eventsReducer,
  modal: modalReducer,
});
