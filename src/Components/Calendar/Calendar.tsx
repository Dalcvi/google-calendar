import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { getFirstDayOfWeek } from '../../Utils/dates';
import CalendarAside from './CalendarAside';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';

interface CalendarProps {
  today: Date;
}

function Calendar({ today }: CalendarProps) {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  const weekOffset = useSelector<AppState, number>(
    (state) => state.calendar.weekOffset
  );

  const daysInAWeek = 7;
  const currentWeek = new Date(today);
  currentWeek.setDate(currentWeek.getDate() + daysInAWeek * weekOffset);
  const firstDayOfWeek = getFirstDayOfWeek(currentWeek);
  return (
    <section className="calendar">
      <CalendarHeader
        firstDayOfWeek={firstDayOfWeek}
        today={today}
        scrollbarWidth={scrollbarWidth}
      />
      <div className="calendar__container">
        <CalendarAside />
        <CalendarGrid
          firstDayOfWeek={firstDayOfWeek}
          today={today}
          setScrollbarWidth={setScrollbarWidth}
        />
      </div>
    </section>
  );
}

export default Calendar;
