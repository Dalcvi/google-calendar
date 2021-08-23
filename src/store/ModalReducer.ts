import { ModalActionTypes } from './actionTypes/ModalActionTypes';
import { ModalActions } from './actions/ModalActions';

export interface ModalState {
  isOpen: boolean;
  type: string;
  position: {
    x: number;
    y: number;
  };
  props: { [key: string]: any };
}
const initialState = {
  isOpen: false,
  type: '',
  position: {
    x: 0,
    y: 0,
  },
  props: {},
};

export const modalReducer = (
  state: ModalState = initialState,
  action: ModalActions
) => {
  switch (action.type) {
    case ModalActionTypes.OPEN_MODAL: {
      return {
        isOpen: true,
        type: action.payload.type,
        position: {
          x: action.payload.x,
          y: action.payload.y,
        },
        props: { ...action.payload.props },
      };
    }
    case ModalActionTypes.CLOSE_MODAL: {
      return {
        isOpen: false,
        type: '',
        position: {
          x: 0,
          y: 0,
        },
        initialDate: new Date(),
      };
    }
    default:
      return state;
  }
};
