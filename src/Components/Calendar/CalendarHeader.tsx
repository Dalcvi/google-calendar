import { areDatesTheSame, getWeekdayName } from '../../Utils/dates';

interface CalendarHeaderProps {
  firstDayOfWeek: Date;
  today: Date;
  scrollbarWidth: number;
}
function CalendarHeader({
  firstDayOfWeek,
  today,
  scrollbarWidth,
}: CalendarHeaderProps) {
  const daysInAWeek = 7;
  const topCells = Array.from({ length: daysInAWeek })
    .map((_, index: number) => {
      const dateCopy = new Date(firstDayOfWeek);
      dateCopy.setDate(dateCopy.getDate() + index);
      return dateCopy;
    })
    .map((dayDate: Date, index: number) => {
      const isDateToday = areDatesTheSame(dayDate, today);
      const coloredWeekDay = isDateToday ? 'calendar__top-cell--colored' : '';
      const coloredDayNumber = isDateToday
        ? 'calendar__top-cell--colored-circle'
        : '';

      const weekDayName = getWeekdayName(index).substr(0, 3);
      const dayNumber = dayDate.getDate();
      return (
        <li key={dayDate.toDateString()} className="calendar__top-cell">
          <p className={'calendar__top-cell-day ' + coloredWeekDay}>
            {weekDayName}
          </p>
          <p className={'calendar__top-cell-day-number ' + coloredDayNumber}>
            {dayNumber}
          </p>
        </li>
      );
    });

  return (
    <header className="calendar__top">
      <aside className="calendar__top-hour-cell">
        <span className="text--size-small text--color-secondary">gmt+03</span>
      </aside>
      <ul
        className="calendar__top-cells list-s-type-none text--color-secondary"
        style={{ width: `calc(100% - ${scrollbarWidth})` }}
      >
        {topCells}
      </ul>
    </header>
  );
}

export default CalendarHeader;
