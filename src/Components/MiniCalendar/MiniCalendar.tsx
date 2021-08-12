import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { getFirstDayOfMonth, getFirstDayOfWeek } from '../../Utils/dates';
import MiniCalendarHeader from './MiniCalendarHeader';
import MiniCalendarRow from './MiniCalendarRow';

interface MiniCalendarProps {
  today: Date;
}

function MiniCalendar({ today }: MiniCalendarProps) {
  const currentMonth = new Date(today);
  const monthOffset = useSelector<AppState, number>(
    (state) => state.miniCalendar.monthOffset
  );

  currentMonth.setMonth(currentMonth.getMonth() + monthOffset);

  const rowAmount = 6;
  const daysInAWeek = 7;
  const firstMonthDay = getFirstDayOfMonth(currentMonth);

  const gridRowArray = Array.from({ length: rowAmount })
    .map((_, index) => {
      const dateCopy = new Date(firstMonthDay);
      dateCopy.setDate(dateCopy.getDate() + daysInAWeek * index);
      const firstDayOfWeek = getFirstDayOfWeek(dateCopy);

      return firstDayOfWeek;
    })
    .map((date: Date) => {
      return (
        <MiniCalendarRow
          key={date.toDateString()}
          firstDayOfWeek={date}
          currentMonth={currentMonth}
          today={today}
        />
      );
    });

  return (
    <section className="mini-calendar">
      <MiniCalendarHeader currentMonth={currentMonth} />
      <div className="mini-calendar-grid__container">
        <ul className="mini-calendar__row">
          <li className="mini-calendar__cell">S</li>
          <li className="mini-calendar__cell">M</li>
          <li className="mini-calendar__cell">T</li>
          <li className="mini-calendar__cell">W</li>
          <li className="mini-calendar__cell">T</li>
          <li className="mini-calendar__cell">F</li>
          <li className="mini-calendar__cell">S</li>
        </ul>
        {gridRowArray}
      </div>
    </section>
  );
}

export default MiniCalendar;
