interface EventButtonProps {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}

function EventButton({
  isSidebarOpen,
  isModalOpen,
  handleClick,
}: EventButtonProps) {
  const circleButton = isSidebarOpen ? '' : 'event-btn--circle';

  return (
    <button
      className={'btn-round event-btn ' + circleButton}
      onClick={(e) => handleClick(e)}
      disabled={isModalOpen}
    >
      Create Event
    </button>
  );
}

export default EventButton;
