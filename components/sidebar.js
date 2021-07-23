class Sidebar {
  constructor(sidebar, eventButton, toggleButton) {
    this.sidebar = sidebar;
    this.eventButton = eventButton;
    this.toggleButton = toggleButton;
    this.__setup();
  }

  __setup() {
    this.__setButtonEvent(this.toggleButton, this.__sidebarToggle);
  }

  __sidebarToggle() {
    this.sidebar.classList.toggle('sidebar--closed');
    this.eventButton.classList.toggle('event-btn--circle');
  }

  __setButtonEvent(button, func) {
    button.addEventListener('click', () => {
      func.call(this);
    });
  }
}
