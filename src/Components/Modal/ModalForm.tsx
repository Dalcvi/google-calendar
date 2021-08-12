import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  calculateDayDifference,
  getDateString,
  getFullDate,
  getTimeString,
} from '../../Utils/dates';
import { CalendarEvent } from '../../Classes/CalendarEvent';
import { saveEvent } from '../../services/JsonServer';

interface ModalFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalForm({ setIsOpen }: ModalFormProps) {
  const today = new Date();
  const [title, setTitle] = useState('');
  const [startingDate, setStartingDate] = useState(getDateString(today));
  const [startingTime, setStartingTime] = useState(getTimeString(today));
  const [endingDate, setEndingDate] = useState(getDateString(today));
  const [endingTime, setEndingTime] = useState(getTimeString(today));
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calendarEvent = new CalendarEvent(
      title,
      getFullDate(startingDate, startingTime),
      getFullDate(endingDate, endingTime),
      description
    );

    saveEvent(calendarEvent, dispatch);
    setIsOpen(false);
  };

  const handleDateOnBlur = () => {
    if (
      calculateDayDifference(new Date(startingDate), new Date(endingDate)) > 0
    ) {
      return;
    }
    setEndingDate(startingDate);
  };

  const handleTimeOnBlur = () => {
    if (startingDate !== endingDate) {
      return;
    }
    const [startingHour, startingMinutes] = startingTime.split(':');
    const [endingHour, endingMinutes] = endingTime.split(':');
    if (
      startingHour < endingHour ||
      (startingHour === endingHour && startingMinutes <= endingMinutes)
    ) {
      return;
    }
    setEndingTime(startingTime);
  };
  return (
    <form className="modal-form" onSubmit={(e) => handleSubmit(e)}>
      <input
        name="title"
        className="modal-form__title-input"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Add title"
        required
      />
      <ul className="list-s-type-none">
        <li className="list--custom-icon mg-t-10">
          <input
            name="starting-date"
            className="input"
            id="starting-date"
            value={startingDate}
            onBlur={() => {
              handleDateOnBlur();
            }}
            onChange={(e) => {
              setStartingDate(e.target.value);
            }}
            type="date"
            required
          />
          <input
            name="starting-hour"
            className="input-text input--short input"
            id="starting-hour"
            value={startingTime}
            onBlur={() => {
              handleTimeOnBlur();
            }}
            onChange={(e) => {
              setStartingTime(e.target.value);
            }}
            type="time"
            required
          />
        </li>
        <li className="list--custom-icon">
          <input
            name="ending-date"
            className="input"
            id="ending-date"
            min={startingDate}
            onBlur={() => {
              handleDateOnBlur();
            }}
            value={endingDate}
            onChange={(e) => {
              setEndingDate(e.target.value);
            }}
            type="date"
            required
          />
          <input
            name="ending-hour"
            className="input-text input--short input"
            id="ending-hour"
            value={endingTime}
            onBlur={() => {
              handleTimeOnBlur();
            }}
            onChange={(e) => {
              setEndingTime(e.target.value);
            }}
            type="time"
            required
          />
        </li>
        <li className="list--custom-icon">
          <textarea
            name="description"
            placeholder="Description"
            className="modal-form--description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </li>
      </ul>
      <div className="modal-footer">
        <button className="modal-footer__button" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

export default ModalForm;
