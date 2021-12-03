import { MiniCalendarActionTypes } from './actionTypes/MiniCalendarActionTypes';
import { MiniCalendarActions } from './actions/MiniCalendarActions';

export interface MiniCalendarState {
  monthOffset: number;
}
const initialState = {
  monthOffset: 0,
};

export const miniCalendarReducer = (
  state: MiniCalendarState = initialState,
  action: MiniCalendarActions
) => {
  switch (action.type) {
    case MiniCalendarActionTypes.GO_ONE_MONTH_FORWARD: {
      return {
        ...state,
        monthOffset: state.monthOffset + 1,
      };
    }
    case MiniCalendarActionTypes.GO_ONE_MONTH_BACK: {
      return {
        ...state,
        monthOffset: state.monthOffset - 1,
      };
    }
    case MiniCalendarActionTypes.RESET_OFFSET: {
      return {
        ...state,
        monthOffset: 0,
      };
    }
    default:
      return state;
  }
};
