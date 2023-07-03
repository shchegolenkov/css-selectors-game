import EventEmitter from './listeners/event-emitter';

export default class WinPopup extends EventEmitter {
  constructor() {
    super();
  }

  private close(element: HTMLDivElement): void {
    element.remove();
  }

  public show(): void {
    const popupWrapper = document.createElement('div');
    popupWrapper.classList.add('popup');

    const popupOvelay = document.createElement('div');
    popupOvelay.classList.add('popup__overlay');

    const popupBlock = document.createElement('div');
    popupBlock.classList.add('popup__block');

    const popupCloseButton = document.createElement('button');
    popupCloseButton.classList.add('button');
    popupCloseButton.textContent = 'x';
    popupBlock.appendChild(popupCloseButton);
    popupCloseButton.onclick = (): void => {
      this.emit('closeWinPopup');
      this.close(popupWrapper);
    };

    const popupText = document.createElement('span');
    popupText.classList.add('popup__text');
    popupText.textContent = 'You did it!\r\nYou rock at CSS!';
    popupBlock.appendChild(popupText);

    popupWrapper.appendChild(popupOvelay);
    popupWrapper.appendChild(popupBlock);
    document.body.appendChild(popupWrapper);
  }
}
