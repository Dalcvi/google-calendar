import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteEvent } from '../../store/actions/EventsActions';
import { CloseModal } from '../../store/actions/ModalActions';

interface CalEventModalProps {
  eventId: number;
  title: string;
  description: string;
}

function CalEventModal({ eventId, title, description }: CalEventModalProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(DeleteEvent(eventId));
    dispatch(CloseModal());
  };

  return (
    <div className="event-modal">
      <p className="event-modal--title">{title}</p>
      <p className="event-modal--description">{description}</p>
      <button
        className="btn-regular btn-warning"
        type="button"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
}

export default CalEventModal;
