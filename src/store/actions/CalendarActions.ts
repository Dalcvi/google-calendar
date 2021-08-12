import { CalendarActionTypes } from '../actionTypes/CalendarActionTypes';

interface GoOneWeekBack {
  type: CalendarActionTypes.GO_ONE_WEEK_BACK;
}

interface GoOneWeekForward {
  type: CalendarActionTypes.GO_ONE_WEEK_FORWARD;
}

interface ResetOffset {
  type: CalendarActionTypes.RESET_OFFSET;
}

export const CalendarActionCreators = {
  goOneWeekBack: (): GoOneWeekBack => ({
    type: CalendarActionTypes.GO_ONE_WEEK_BACK,
  }),
  goOneWeekForward: (): GoOneWeekForward => ({
    type: CalendarActionTypes.GO_ONE_WEEK_FORWARD,
  }),
  ResetOffset: (): ResetOffset => ({ type: CalendarActionTypes.RESET_OFFSET }),
};

export type CalendarActions = GoOneWeekBack | GoOneWeekForward | ResetOffset;
