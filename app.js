class App {
  constructor() {
    this.header = new Header(document.querySelector('.header'));
    this.services = new Services();
    this.sidebar = new Sidebar(
      document.querySelector('.sidebar'),
      document.querySelector('.event-btn'),
      this.header.hamburger
    );
    this.modal = new Modal(
      document.querySelector('.event-btn'),
      this.services.addEvent.bind(this.services)
    );
    this.miniCalendar = new MiniCalendar(
      document.querySelector('.mini-calendar'),
      this.header.todayButton
    );
    this.calendar = new Calendar(
      document.querySelector('.calendar'),
      this.header.todayButton,
      this.header.monthText,
      this.header.leftButton,
      this.header.rightButton,
      this.services.eventsList,
      this.services.changeUpdateFunction.bind(this.services)
    );
  }
}
