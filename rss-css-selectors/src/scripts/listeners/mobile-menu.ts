export default class MobileMenu {
  private mobileMenuButton: HTMLElement | null;
  private menu: HTMLElement | null;

  constructor() {
    this.mobileMenuButton = document.querySelector('.nav__icon');
    this.menu = document.querySelector('.nav');
  }

  public listen(): void {
    if (this.mobileMenuButton) {
      this.mobileMenuButton.onclick = (): void => {
        if (this.menu) this.menu.classList.toggle('nav--active');
      };
    }
  }
}
