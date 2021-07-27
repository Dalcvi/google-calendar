class Sidebar {
  constructor(sidebar, eventButton, toggleButton) {
    this.__sidebar = sidebar;
    this.eventButton = eventButton;
    this.__toggleButton = toggleButton;
    this.__setup();
  }

  __setup() {
    this.__setButtonEvent(this.__toggleButton, this.__sidebarToggle);
  }

  __sidebarToggle() {
    this.__sidebar.classList.toggle('sidebar--closed');
    this.eventButton.classList.toggle('event-btn--circle');
  }

  __setButtonEvent(button, func) {
    button.addEventListener('click', () => {
      func.call(this);
    });
  }
}
