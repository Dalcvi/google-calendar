import { areDatesTheSame, isTheSameMonth } from '../../Utils/dates';

interface MiniCalendarRowProps {
  firstDayOfWeek: Date;
  currentMonth: Date;
  today: Date;
}

function MiniCalendarRow({
  firstDayOfWeek,
  currentMonth,
  today,
}: MiniCalendarRowProps) {
  const daysInAWeek = 7;

  const cellArray = Array.from({ length: daysInAWeek })
    .map((_, index) => {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + index);
      return date;
    })
    .map((date: Date) => {
      const secondaryColor = isTheSameMonth(date, currentMonth)
        ? ''
        : 'text--color-secondary ';
      const todayColor = areDatesTheSame(date, today)
        ? 'mini-calendar__cell--colored-circle'
        : '';

      return (
        <li
          key={date.getDate()}
          className={'mini-calendar__cell ' + secondaryColor + todayColor}
        >
          {date.getDate()}
        </li>
      );
    });

  return <ul className="mini-calendar__row">{cellArray}</ul>;
}

export default MiniCalendarRow;
