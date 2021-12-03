import React from 'react';
import { useDispatch } from 'react-redux';
import { OpenModal } from '../../store/actions/ModalActions';

interface CalendarGridCellProps {
  date: Date;
}

function CalendarGridCell({ date }: CalendarGridCellProps) {
  const firstDateCopy = new Date(date);
  const secondDateCopy = new Date(date);
  secondDateCopy.setMinutes(30);
  const divStyle = { height: '50%', zIndex: 10 };
  const modalType = 'formModal';

  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>, initialDate: Date) => {
    const rect = (e.target as Element).getBoundingClientRect();
    const y = rect.top + 290 > window.innerHeight ? rect.top - 290 : rect.top;
    const x =
      rect.right + 420 > window.innerWidth ? rect.left - 420 : rect.right;

    setTimeout(() => {
      dispatch(
        OpenModal({
          type: modalType,
          y,
          x,
          props: { initialDate: initialDate },
        })
      );
    }, 5);
  };

  return (
    <li className="calendar-grid__cell">
      <div
        style={divStyle}
        onClick={(e) => handleClick(e, firstDateCopy)}
      ></div>
      <div
        style={divStyle}
        onClick={(e) => handleClick(e, secondDateCopy)}
      ></div>
    </li>
  );
}

export default CalendarGridCell;
