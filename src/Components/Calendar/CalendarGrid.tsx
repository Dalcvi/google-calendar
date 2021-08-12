import CalEvents from '../Events/CalEvents';

interface CalendarGridProps {
  today: Date;
}

function CalendarGrid({ today }: CalendarGridProps) {
  const hoursToDisplay = 24;
  const daysInAWeek = 7;
  const cellsAmount = hoursToDisplay * daysInAWeek;

  const gridCells = Array.from({ length: cellsAmount }).map((_, index) => {
    return <li key={index} className="calendar-grid__cell"></li>;
  });

  return (
    <div className="calendar-grid-container">
      <ul className="calendar-grid list-s-type-none">{gridCells}</ul>
      <CalEvents today={today} />
    </div>
  );
}

export default CalendarGrid;
