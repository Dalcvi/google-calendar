class Header {
  constructor(header, sidebar, eventButton) {
    this.header = header;
    this.hamburger = null;
    this.monthText = null;
    this.todayButton = null;
    this.leftButton = null;
    this.rightButton = null;
    this.__createHeader();
  }

  __createHeader() {
    const headerTemplate =
      this.header.querySelector('.header-template').content;

    this.hamburger = headerTemplate.querySelector('.hamburger');
    this.monthText = headerTemplate.querySelector('.header__month-title');
    this.todayButton = headerTemplate.querySelector(
      '[data-main-action="today"'
    );
    this.leftButton = headerTemplate.querySelector('[data-main-action="left"]');
    this.rightButton = headerTemplate.querySelector(
      '[data-main-action="right"]'
    );

    this.header.appendChild(headerTemplate);
  }
}
