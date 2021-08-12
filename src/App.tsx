import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Calendar from './Components/Calendar/Calendar';
import EventButton from './Components/EventButton';
import Header from './Components/Header';
import MiniCalendar from './Components/MiniCalendar/MiniCalendar';
import Modal from './Components/Modal/Modal';
import Sidebar from './Components/Sidebar';
import { fetchEvents } from './services/JsonServer';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchEvents(dispatch);
  }, [dispatch]);

  const handleEventButtonClick = (e: React.MouseEvent<HTMLElement>): void => {
    setTimeout(() => {
      if (isModalOpen) {
        return;
      }
      setIsModalOpen(true);
      const rect = (e.target as Element).getBoundingClientRect();

      setModalPosition({ top: rect.top, left: rect.right });
    }, 5);
  };

  useEffect(() => {
    const handleClickOutsideModal = (e: MouseEvent) => {
      const modal = document.querySelector('.modal');
      if (!modal || !e.target) {
        return;
      }
      if (e.target === modal || modal.contains(e.target as Node)) {
        return;
      }

      setIsModalOpen(false);
    };

    document.addEventListener('click', handleClickOutsideModal);
    return () => {
      document.removeEventListener('click', handleClickOutsideModal);
    };
  }, [isModalOpen]);

  const today = new Date();

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        position={modalPosition}
      />
      <Header
        today={today}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="main">
        <EventButton
          isSidebarOpen={isSidebarOpen}
          handleClick={handleEventButtonClick}
          isModalOpen={isModalOpen}
        />
        <Sidebar isSidebarOpen={isSidebarOpen}>
          <MiniCalendar today={today} />
        </Sidebar>
        <Calendar today={today} />
      </main>
    </>
  );
}

export default App;
