(() => {
  const header = new Header(document.querySelector('.header'));
  const services = new Services();
  const sidebar = new Sidebar(
    document.querySelector('.sidebar'),
    document.querySelector('.event-btn'),
    header.hamburger
  );
  const modal = new Modal(
    document.querySelector('.event-btn'),
    services.addEvent.bind(services)
  );
  const miniCalendar = new MiniCalendar(
    document.querySelector('.mini-calendar'),
    header.todayButton
  );
  const calendar = new Calendar(
    document.querySelector('.calendar'),
    header.todayButton,
    header.monthText,
    header.leftButton,
    header.rightButton,
    services.eventsList,
    services.changeUpdateFunction.bind(services)
  );
})();
