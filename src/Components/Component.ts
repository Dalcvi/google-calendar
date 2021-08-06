import { Model, Callback } from '../Models/Model';

export type EventsMap = { [key: string]: Callback[] };
export type RegionsMap = { [key: string]: string };

export abstract class Component {
  protected eventsMap: EventsMap;
  protected regionsMap: RegionsMap;
  protected regions: { [key: string]: Element | NodeListOf<Element> };

  constructor(public parentElement: Element) {
    this.eventsMap = {};
    this.regionsMap = {};
    this.regions = {};
  }

  abstract template(): string;

  onRender(): void {}

  createEventsMap(): EventsMap {
    return {};
  }

  createRegionsMap(): RegionsMap {
    return {};
  }

  render(): void {
    this.parentElement.innerHTML = ``;
    const templateElement = document.createElement('template');

    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parentElement.append(templateElement.content);
  }

  mapRegions(fragment: DocumentFragment): void {
    for (let key in this.regionsMap) {
      const selector = this.regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  isElement(prop: Element | NodeListOf<Element>): prop is Element {
    return prop instanceof Element;
  }

  isListOfElements(
    prop: Element | NodeListOf<Element>
  ): prop is NodeListOf<Element> {
    return NodeList.prototype.isPrototypeOf(prop);
  }

  bindEvents(fragment: DocumentFragment): void {
    for (let eventKey in this.eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((element: Element) => {
        this.eventsMap[eventKey].forEach((callback: Callback) => {
          element.addEventListener(eventName, callback);
        });
      });
    }
  }

  bindModel(model: Model) {
    model.addEvent('change', () => {
      this.render();
    });
  }

  addToEventsMap(eventKey: string, callback: Callback) {
    if (!this.eventsMap[eventKey]) {
      this.eventsMap[eventKey] = [];
    }

    this.eventsMap[eventKey].push(callback);
  }
}
