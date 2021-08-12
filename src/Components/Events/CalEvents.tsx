import { useSelector } from 'react-redux';
import { CalendarEvent } from '../../Classes/CalendarEvent';
import { AppState } from '../../store';
import { getFirstDayOfWeek } from '../../Utils/dates';
import CalEvent from './CalEvent';

interface EventsProps {
  today: Date;
}

function CalEvents({ today }: EventsProps) {
  const daysInAWeek = 7;
  const weekOffset = useSelector<AppState, number>(
    (state) => state.calendar.weekOffset
  );
  const allEvents = useSelector<AppState, CalendarEvent[]>(
    (state) => state.events.events
  );

  const currentWeek = new Date(today);
  currentWeek.setDate(currentWeek.getDate() + daysInAWeek * weekOffset);
  const weekStart = getFirstDayOfWeek(currentWeek);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const currentWeekEvents = allEvents.filter((calendarEvent) =>
    calendarEvent.isEventIntersectingDates(weekStart, weekEnd)
  );

  const eventElements = currentWeekEvents.map((calendarEvent) => {
    return (
      <CalEvent
        key={
          calendarEvent.get('title') +
          calendarEvent.get('description') +
          calendarEvent.get('id')
        }
        calendarEvent={calendarEvent}
        weekStart={weekStart}
        weekEnd={weekEnd}
      />
    );
  });

  return <div className="calendar-event-container">{eventElements}</div>;
}

export default CalEvents;
