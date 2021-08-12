import { get12ClockHourTime } from '../../Utils/dates';

function CalendarAside() {
  const hoursToDisplay = 23;

  const hourCells = Array.from({ length: hoursToDisplay })
    .map((_, index) => {
      return get12ClockHourTime(index + 1);
    })
    .map((hour: string) => {
      return (
        <li key={hour} className="calendar__hour-cell">
          <span className="calendar__hour-text">{hour}</span>
        </li>
      );
    });

  return (
    <aside className="calendar__hour-cells">
      <ul className="calendar__hour-cells-container">{hourCells}</ul>
    </aside>
  );
}

export default CalendarAside;
