import { CalendarEvent } from '../../Classes/CalendarEvent';
import { calculateDayDifference } from '../../Utils/dates';

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

  const eventElements = [];
  for (let key in positionsByDay) {
    const position = positionsByDay[key];
    let eventText = <></>;
    if (eventElements.length === 0) {
      eventText = (
        <p>
          <strong>{calendarEvent.get('title')}</strong>,{' '}
          {calendarEvent.get('description')}
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
        key={`${calendarEvent.get('title') + key + calendarEvent.get('id')}`}
        className="calendar__event"
        style={style}
      >
        {eventText}
      </div>
    );
  }
  return <>{eventElements}</>;
}

export default CalEvent;
