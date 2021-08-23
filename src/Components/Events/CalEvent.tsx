import { useDispatch, useSelector } from 'react-redux';
import { CalendarEvent } from '../../Classes/CalendarEvent';
import { AppState } from '../../store';
import { OpenModal } from '../../store/actions/ModalActions';
import { calculateDayDifference } from '../../Utils/dates';
import Modal from '../Modal/Modal';
import CalEventModal from './CalEventModal';

interface CalEventProps {
  calendarEvent: CalendarEvent;
  weekStart: Date;
  weekEnd: Date;
}

function CalEvent({ calendarEvent, weekStart, weekEnd }: CalEventProps) {
  const hoursInADay = 24;
  const minutesInAHour = 60;
  const minutesInADay = hoursInADay * minutesInAHour;
  const positionsByDay = calendarEvent.getPositionsInRange(weekStart, weekEnd);
  const eventId = calendarEvent.get('id') ?? 0;
  const title = calendarEvent.get('title');
  const description = calendarEvent.get('description');

  const modalState = useSelector((state: AppState) => state.modal);
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.target as Element).getBoundingClientRect();
    const y = rect.top + 290 > window.innerHeight ? rect.top - 290 : rect.top;
    const x =
      rect.right + 420 > window.innerWidth ? rect.left - 420 : rect.right;

    setTimeout(() => {
      dispatch(
        OpenModal({
          type: `eventModal${eventId}`,
          y,
          x,
          props: {},
        })
      );
    }, 5);
  };

  const eventElements = [];
  for (let key in positionsByDay) {
    const position = positionsByDay[key];
    let eventText = <></>;
    if (eventElements.length === 0) {
      eventText = (
        <p>
          <strong>{title}</strong>, {description}
        </p>
      );
    }

    const daysSinceSunday = calculateDayDifference(weekStart, new Date(key));

    const style = {
      top: (position.top / minutesInADay) * 100 + '%',
      height: (position.height / minutesInADay) * 100 + '%',
      left: `calc(100%/7 * ${daysSinceSunday})`,
      width: `calc(100%/7 - 15px)`,
    };

    eventElements.push(
      <div
        key={` ${daysSinceSunday}|${eventId}`}
        className="calendar__event"
        style={style}
        onClick={(e) => handleClick(e)}
      >
        {eventText}
      </div>
    );
  }

  return (
    <>
      {modalState.type === `eventModal${eventId}` && modalState.isOpen && (
        <Modal>
          <CalEventModal
            eventId={eventId}
            title={title}
            description={description}
          />
        </Modal>
      )}
      {eventElements}
    </>
  );
}

export default CalEvent;
