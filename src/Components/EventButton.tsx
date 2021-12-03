import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { OpenModal } from '../store/actions/ModalActions';

interface EventButtonProps {
  isSidebarOpen: boolean;
}

function EventButton({ isSidebarOpen }: EventButtonProps) {
  const circleButton = isSidebarOpen ? '' : 'event-btn--circle';
  const isModalOpen = useSelector((state: AppState) => state.modal.isOpen);
  const modalType = 'formModal';
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    const rect = (e.target as Element).getBoundingClientRect();
    setTimeout(() => {
      dispatch(
        OpenModal({
          type: modalType,
          y: rect.top,
          x: rect.right,
          props: { initialDate: new Date() },
        })
      );
    }, 5);
  };

  return (
    <>
      <button
        className={'btn-round event-btn ' + circleButton}
        onClick={(e) => handleClick(e)}
        disabled={isModalOpen}
      >
        Create Event
      </button>
    </>
  );
}

export default EventButton;
