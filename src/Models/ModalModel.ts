import { Model } from './Model';

interface ModalProps {
  isOpen?: boolean;
  position?: Position;
  lastOpened?: number;
}

interface Position {
  top: string;
  left: string;
}

export class ModalModel extends Model<ModalProps> {
  constructor() {
    super({ isOpen: false, lastOpened: 0, position: { top: '0', left: '0' } });
  }

  show = (position: Position): void => {
    if (!this.data.isOpen) {
      this.set({ isOpen: true, lastOpened: new Date().getTime(), position });
    }
  };

  close = (): void => {
    if (this.data.isOpen && this.isAfterTimeoutPeriod()) {
      this.set({ isOpen: false });
    }
  };

  isAfterTimeoutPeriod(): boolean {
    const timeout = 25;

    const now = new Date().getTime();
    const lastOpened = this.data.lastOpened ?? 0;

    return now - lastOpened > timeout;
  }
}
