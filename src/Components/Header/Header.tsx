import { useDispatch } from 'react-redux';
import { CalendarActionCreators } from '../../store/actions/CalendarActions';
import { MiniCalendarActionCreators } from '../../store/actions/MiniCalendarActions';
import HeaderMonthTitle from './HeaderMonthTitle';

interface HeaderProps {
  today: Date;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ today, isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
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
      <HeaderMonthTitle today={today} />
      <button className="btn-regular header__view-button">Week</button>
    </header>
  );
}

export default Header;
