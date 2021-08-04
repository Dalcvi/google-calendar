import { Model } from './Model';

export class SidebarModel extends Model {
  constructor() {
    super({});
  }
  toggle = (): void => {
    this.triggerEvent('toggle');
  };
}
