import { ModalActionTypes } from '../actionTypes/ModalActionTypes';

interface IOpenModal {
  type: ModalActionTypes.OPEN_MODAL;
  payload: {
    type: string;
    x: number;
    y: number;
    props: { [key: string]: any };
  };
}

interface ICloseModal {
  type: ModalActionTypes.CLOSE_MODAL;
}

export const OpenModal = (payload: {
  type: string;
  x: number;
  y: number;
  props: { [key: string]: any };
}): IOpenModal => {
  return {
    type: ModalActionTypes.OPEN_MODAL,
    payload,
  };
};
export const CloseModal = (): ICloseModal => ({
  type: ModalActionTypes.CLOSE_MODAL,
});

export type ModalActions = IOpenModal | ICloseModal;
