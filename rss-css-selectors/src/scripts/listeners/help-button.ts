import EventEmitter from './event-emitter';
import LEVELS from '../data/levels';
import State from '../state';

export default class HelpButton extends EventEmitter {
  public helpButton: HTMLButtonElement;

  constructor() {
    super();
    this.helpButton = <HTMLButtonElement>document.querySelector('.main__button');
  }

  public listen(): void {
    this.helpButton.onclick = (): void => this.clickButton();
  }

  private clickButton(): void {
    const state = new State();
    const currentLevel = state.getCurrentLevel() - 1;
    this.helpButton.disabled = true;
    this.emit('help', LEVELS[currentLevel].selectors[0]);
    setTimeout(() => {
      this.helpButton.disabled = false;
    }, 1000);
  }
}
