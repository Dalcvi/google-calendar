import { CalendarActionTypes } from './actionTypes/CalendarActionTypes';
import { CalendarActions } from './actions/CalendarActions';

export interface CalendarState {
  weekOffset: number;
}
const initialState = {
  weekOffset: 0,
};

export const calendarReducer = (
  state: CalendarState = initialState,
  action: CalendarActions
) => {
  switch (action.type) {
    case CalendarActionTypes.GO_ONE_WEEK_FORWARD: {
      return {
        ...state,
        weekOffset: state.weekOffset + 1,
      };
    }
    case CalendarActionTypes.GO_ONE_WEEK_BACK: {
      return {
        ...state,
        weekOffset: state.weekOffset - 1,
      };
    }
    case CalendarActionTypes.RESET_OFFSET: {
      return {
        ...state,
        weekOffset: 0,
      };
    }
    default:
      return state;
  }
};
