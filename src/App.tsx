import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from './Components/Calendar/Calendar';
import EventButton from './Components/EventButton';
import Header from './Components/Header';
import MiniCalendar from './Components/MiniCalendar/MiniCalendar';
import Modal from './Components/Modal/Modal';
import ModalForm from './Components/Modal/ModalForm';
import Sidebar from './Components/Sidebar';
import { AppState } from './store';
import { GetEvents } from './store/actions/EventsActions';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetEvents());
  }, [dispatch]);

  const today = new Date();
  const modalState = useSelector((state: AppState) => state.modal);

  return (
    <>
      {modalState.isOpen && modalState.type === 'formModal' && (
        <Modal>
          <ModalForm
            initialDate={modalState.props?.initialDate ?? new Date()}
          />
        </Modal>
      )}
      <Header
        today={today}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="main">
        <EventButton isSidebarOpen={isSidebarOpen} />
        <Sidebar isSidebarOpen={isSidebarOpen}>
          <MiniCalendar today={today} />
        </Sidebar>
        <Calendar today={today} />
      </main>
    </>
  );
}

export default App;
