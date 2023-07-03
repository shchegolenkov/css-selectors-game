import EventEmitter from './event-emitter';

export default class ResetProgress extends EventEmitter {
  private resetButton: HTMLElement | null;

  constructor() {
    super();
    this.resetButton = document.querySelector('.nav__button');
  }

  public listen(): void {
    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => {
        this.emit('reset');
      });
    }
  }
}
