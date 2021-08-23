import CalEvents from '../Events/CalEvents';
import CalendarGridCell from './CalendarGridCell';

interface CalendarGridProps {
  today: Date;
  firstDayOfWeek: Date;
}

function CalendarGrid({ today, firstDayOfWeek }: CalendarGridProps) {
  const hoursToDisplay = 24;
  const daysInAWeek = 7;
  const cellsAmount = hoursToDisplay * daysInAWeek;
  let day = 0;

  const gridCells = Array.from({ length: cellsAmount }).map((_, index) => {
    if (index !== 0 && index % hoursToDisplay === 0) {
      day++;
    }
    const dateCopy = new Date(firstDayOfWeek);
    dateCopy.setDate(dateCopy.getDate() + day);
    const hoursByCell = index % hoursToDisplay;
    dateCopy.setHours(hoursByCell, 0, 0, 1);

    return <CalendarGridCell key={index} date={dateCopy} />;
  });

  return (
    <div className="calendar-grid-container">
      <ul className="calendar-grid list-s-type-none">{gridCells}</ul>
      <CalEvents today={today} />
    </div>
  );
}

export default CalendarGrid;
