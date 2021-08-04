import { Component } from '../../Component';

export class MiniCalGridHeader extends Component {
  template(): string {
    return `
        <div class="mini-calendar__cell mini-calendar__cell--secondary">S</div>
        <div class="mini-calendar__cell mini-calendar__cell--secondary">M</div>
        <div class="mini-calendar__cell mini-calendar__cell--secondary">T</div>
        <div class="mini-calendar__cell mini-calendar__cell--secondary">W</div>
        <div class="mini-calendar__cell mini-calendar__cell--secondary">T</div>
        <div class="mini-calendar__cell mini-calendar__cell--secondary">F</div>
        <div class="mini-calendar__cell mini-calendar__cell--secondary">S</div>
    `;
  }
}
