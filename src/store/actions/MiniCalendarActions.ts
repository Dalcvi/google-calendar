import { MiniCalendarActionTypes } from '../actionTypes/MiniCalendarActionTypes';

interface GoOneMonthBack {
  type: MiniCalendarActionTypes.GO_ONE_MONTH_BACK;
}

interface GoOneMonthForward {
  type: MiniCalendarActionTypes.GO_ONE_MONTH_FORWARD;
}

interface ResetOffset {
  type: MiniCalendarActionTypes.RESET_OFFSET;
}

export const MiniCalendarActionCreators = {
  GoOneMonthBack: (): GoOneMonthBack => ({
    type: MiniCalendarActionTypes.GO_ONE_MONTH_BACK,
  }),
  GoOneMonthForward: (): GoOneMonthForward => ({
    type: MiniCalendarActionTypes.GO_ONE_MONTH_FORWARD,
  }),
  ResetOffset: (): ResetOffset => ({
    type: MiniCalendarActionTypes.RESET_OFFSET,
  }),
};

export type MiniCalendarActions =
  | GoOneMonthBack
  | GoOneMonthForward
  | ResetOffset;
