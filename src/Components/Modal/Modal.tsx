import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { CloseModal } from '../../store/actions/ModalActions';

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const position = useSelector((state: AppState) => state.modal.position);

  const style = {
    top: position.y,
    left: position.x,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutsideModal = (e: MouseEvent) => {
      const modal = document.querySelector('.modal');

      if (!modal || !e.target) {
        return;
      }
      if (e.target === modal || modal.contains(e.target as Node)) {
        return;
      }

      dispatch(CloseModal());
    };

    document.addEventListener('click', handleClickOutsideModal);
    return () => {
      document.removeEventListener('click', handleClickOutsideModal);
    };
  }, [dispatch]);

  return createPortal(
    <section style={style} className="modal">
      <header className="modal-header">
        <button
          className="modal-header__button"
          onClick={() => dispatch(CloseModal())}
        >
          &times;
        </button>
      </header>
      {children}
    </section>,
    document.body
  );
}

export default Modal;
