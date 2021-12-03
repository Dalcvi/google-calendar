import { useDispatch } from 'react-redux';
import { MiniCalendarActionCreators } from '../../store/actions/MiniCalendarActions';
import { getMonthName } from '../../Utils/dates';

interface MiniCalendarHeaderProps {
  currentMonth: Date;
}

function MiniCalendarHeader({ currentMonth }: MiniCalendarHeaderProps) {
  const monthName = getMonthName(currentMonth);

  const dispatch = useDispatch();

  return (
    <header className="mini-calendar__header">
      <h3 className="mini-calendar__top-name">{monthName}</h3>
      <div className="mini-calendar__movement-buttons">
        <button
          className="btn mini-calendar__movement-button left-arrow"
          data-mini-action="left"
          onClick={() => {
            dispatch(MiniCalendarActionCreators.GoOneMonthBack());
          }}
        ></button>
        <button
          className="btn mini-calendar__movement-button right-arrow"
          data-mini-action="right"
          onClick={() =>
            dispatch(MiniCalendarActionCreators.GoOneMonthForward())
          }
        ></button>
      </div>
    </header>
  );
}

export default MiniCalendarHeader;
