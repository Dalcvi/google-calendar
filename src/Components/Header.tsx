import { useDispatch, useSelector } from 'react-redux';
import { getFirstDayOfWeek, getMonthTitle } from '../Utils/dates';
import { CalendarActionCreators } from '../store/actions/CalendarActions';
import { MiniCalendarActionCreators } from '../store/actions/MiniCalendarActions';
import { AppState } from '../store';

interface HeaderProps {
  today: Date;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ today, isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
  const daysInAWeek = 7;
  const currentWeek = new Date(today);
  const weekOffset = useSelector<AppState, number>(
    (state) => state.calendar.weekOffset
  );
  currentWeek.setDate(currentWeek.getDate() + daysInAWeek * weekOffset);

  const monthName = getMonthTitle(getFirstDayOfWeek(currentWeek));
  const dispatch = useDispatch();
  const handleHamburgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleForwardClick = () => {
    dispatch(CalendarActionCreators.goOneWeekForward());
  };
  const handleBackClick = () => {
    dispatch(CalendarActionCreators.goOneWeekBack());
  };

  const handleResetClick = () => {
    dispatch(CalendarActionCreators.ResetOffset());
    dispatch(MiniCalendarActionCreators.ResetOffset());
  };

  return (
    <header className="header">
      <button
        className="hamburger"
        onClick={() => handleHamburgerClick()}
      ></button>
      <h1 className="header__title">Calendar</h1>
      <button
        className="btn-regular header__today"
        data-main-action="today"
        onClick={() => {
          handleResetClick();
        }}
      >
        Today
      </button>
      <div className="header__movement-buttons">
        <button
          className="btn header__movement-button left-arrow"
          data-main-action="left"
          onClick={() => handleBackClick()}
        ></button>
        <button
          className="btn header__movement-button right-arrow"
          data-main-action="right"
          onClick={() => handleForwardClick()}
        ></button>
      </div>
      <h2 className="header__month-title">{monthName}</h2>
      <button className="btn-regular header__view-button">Week</button>
    </header>
  );
}

export default Header;
