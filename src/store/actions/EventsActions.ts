import { Dispatch } from 'redux';
import { CalendarEvent } from '../../Classes/CalendarEvent';
import { deleteEvent, fetchEvents, saveEvent } from '../../services/JsonServer';
import { EventsActionTypes } from '../actionTypes/EventsActionTypes';

interface IAddEventPending {
  type: EventsActionTypes.ADD_EVENT_PENDING;
}
interface IAddEventSuccess {
  type: EventsActionTypes.ADD_EVENT_SUCCESS;
  payload: CalendarEvent;
}
interface IAddEventFailure {
  type: EventsActionTypes.ADD_EVENT_FAILURE;
  payload: Error;
}
interface IGetEventsPending {
  type: EventsActionTypes.GET_EVENTS_PENDING;
}
interface IGetEventsSuccess {
  type: EventsActionTypes.GET_EVENTS_SUCCESS;
  payload: CalendarEvent[];
}
interface IGetEventsFailure {
  type: EventsActionTypes.GET_EVENTS_FAILURE;
  payload: Error;
}

interface IDeleteEventPending {
  type: EventsActionTypes.DELETE_EVENT_PENDING;
}
interface IDeleteEventSuccess {
  type: EventsActionTypes.DELETE_EVENT_SUCCESS;
  payload: number;
}
interface IDeleteEventFailure {
  type: EventsActionTypes.DELETE_EVENT_FAILURE;
  payload: Error;
}

export const AddEventPending = (): IAddEventPending => ({
  type: EventsActionTypes.ADD_EVENT_PENDING,
});
export const AddEventSuccess = (payload: CalendarEvent): IAddEventSuccess => ({
  type: EventsActionTypes.ADD_EVENT_SUCCESS,
  payload,
});
export const AddEventFailure = (payload: Error): IAddEventFailure => ({
  type: EventsActionTypes.ADD_EVENT_FAILURE,
  payload,
});
export const GetEventsPending = (): IGetEventsPending => ({
  type: EventsActionTypes.GET_EVENTS_PENDING,
});
export const GetEventsSuccess = (
  payload: CalendarEvent[]
): IGetEventsSuccess => ({
  type: EventsActionTypes.GET_EVENTS_SUCCESS,
  payload,
});
export const GetEventsFailure = (payload: Error): IGetEventsFailure => ({
  type: EventsActionTypes.GET_EVENTS_FAILURE,
  payload,
});
export const DeleteEventPending = (): IDeleteEventPending => ({
  type: EventsActionTypes.DELETE_EVENT_PENDING,
});
export const DeleteEventSuccess = (payload: number): IDeleteEventSuccess => ({
  type: EventsActionTypes.DELETE_EVENT_SUCCESS,
  payload,
});
export const DeleteEventFailure = (payload: Error): IDeleteEventFailure => ({
  type: EventsActionTypes.DELETE_EVENT_FAILURE,
  payload,
});

export type EventsActions =
  | IAddEventPending
  | IAddEventSuccess
  | IAddEventFailure
  | IGetEventsPending
  | IGetEventsSuccess
  | IGetEventsFailure
  | IDeleteEventPending
  | IDeleteEventFailure
  | IDeleteEventSuccess;

export const GetEvents = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(GetEventsPending());
    fetchEvents()
      .then(async (response) => {
        const data: any[] = await response.json();
        const calendarEvents: CalendarEvent[] = data
          .filter((data: any) => {
            return CalendarEvent.isCalendarEvent(data);
          })
          .map((calEvent) => {
            return CalendarEvent.createEventWithIdFromObject(calEvent);
          });
        dispatch(GetEventsSuccess(calendarEvents));
      })
      .catch((error) => {
        dispatch(GetEventsFailure(error));
      });
  };
};

export const AddEvent = (calEvent: CalendarEvent) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(AddEventPending());
    saveEvent(calEvent)
      .then(async (response) => {
        const data = await response.json();
        if (!CalendarEvent.isCalendarEvent(data)) {
          throw new Error('Wrong format!');
        }

        dispatch(
          AddEventSuccess(CalendarEvent.createEventWithIdFromObject(data))
        );
      })
      .catch((error: Error) => {
        dispatch(AddEventFailure(error));
      });
  };
};

export const DeleteEvent = (id: number) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(DeleteEventPending());
    deleteEvent(id)
      .then(() => {
        dispatch(DeleteEventSuccess(id));
      })
      .catch((error: Error) => {
        dispatch(DeleteEventFailure(error));
      });
  };
};
