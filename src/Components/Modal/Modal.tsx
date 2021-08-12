import { createPortal } from 'react-dom';
import ModalForm from './ModalForm';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position: { top: number; left: number };
}

function Modal({ isOpen, setIsOpen, position }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <section style={position} className="modal">
      <header className="modal-header">
        <button
          className="modal-header__button"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>
      </header>
      <ModalForm setIsOpen={setIsOpen} />
    </section>,
    document.body
  );
}

export default Modal;
