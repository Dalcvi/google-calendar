import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { getFirstDayOfWeek, getMonthTitle } from '../../Utils/dates';

interface HeaderMonthTitleProps {
  today: Date;
}

function HeaderMonthTitle({ today }: HeaderMonthTitleProps) {
  const daysInAWeek = 7;
  const currentWeek = new Date(today);
  const weekOffset = useSelector<AppState, number>(
    (state) => state.calendar.weekOffset
  );
  currentWeek.setDate(currentWeek.getDate() + daysInAWeek * weekOffset);

  const monthName = getMonthTitle(getFirstDayOfWeek(currentWeek));

  return <h2 className="header__month-title">{monthName}</h2>;
}

export default HeaderMonthTitle;
