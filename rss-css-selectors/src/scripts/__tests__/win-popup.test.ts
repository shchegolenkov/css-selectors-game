import WinPopup from '../win-popup';

describe('WinPopup', () => {
  let winPopup: WinPopup;
  let mockElement: HTMLDivElement;

  beforeAll(() => {
    winPopup = new WinPopup();
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  describe('show', () => {
    it('should create and append a popup element to the DOM', () => {
      winPopup.show();

      const popupWrapper = document.querySelector('.popup');

      expect(popupWrapper).not.toBeNull();
      expect(document.body.contains(popupWrapper)).toBe(true);
    });
  });

  describe('close', () => {
    it('should remove the element from the DOM', () => {
      mockElement = document.createElement('div');
      document.body.appendChild(mockElement);
      winPopup['close'](mockElement);

      expect(document.body.contains(mockElement)).toBe(false);
    });
  });
});
