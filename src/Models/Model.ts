export type Callback = () => void;
type Events = { [key: string]: Callback[] };

export class Model<T = {}> {
  protected events: Events = {};

  constructor(protected data: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set(update: T): void {
    Object.assign(this.data, update);
    this.triggerEvent('change');
  }

  addEvent(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];

    handlers.push(callback);

    this.events[eventName] = handlers;
  }

  triggerEvent(eventName: string) {
    const handlers = this.events[eventName];
    if (!handlers) {
      return;
    }
    handlers.forEach((callback: Callback) => {
      callback();
    });
  }
}
