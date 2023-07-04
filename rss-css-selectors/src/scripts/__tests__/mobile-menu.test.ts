import MobileMenu from '../listeners/mobile-menu';

describe('MobileMenu', () => {
  let mobileMenu: MobileMenu;
  let mobileMenuButton: HTMLDivElement;
  let mobileMenuBlock: HTMLDivElement;

  beforeAll(() => {
    mobileMenuButton = document.createElement('div');
    mobileMenuButton.classList.add('nav__icon');
    document.body.appendChild(mobileMenuButton);

    mobileMenuBlock = document.createElement('div');
    mobileMenuBlock.classList.add('nav');
    document.body.appendChild(mobileMenuBlock);

    mobileMenu = new MobileMenu();
    mobileMenu.listen();
  });

  afterAll(() => {
    document.body.removeChild(mobileMenuButton);
    document.body.removeChild(mobileMenuBlock);
  });

  it('should add "nav--active" class on menu element on mobileMenuButton first click', () => {
    mobileMenuButton.click();

    expect(mobileMenuBlock.classList.contains('nav--active')).toBe(true);
  });

  it('should remove "nav--active" class on menu element on mobileMenuButton secord click', () => {
    mobileMenuButton.click();

    expect(mobileMenuBlock.classList.contains('nav--active')).toBe(false);
  });
});
