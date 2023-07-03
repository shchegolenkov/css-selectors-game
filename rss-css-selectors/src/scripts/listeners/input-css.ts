import EventEmitter from './event-emitter';

export default class InputCss extends EventEmitter {
  public input: HTMLInputElement;
  public submitButton: HTMLButtonElement;

  constructor() {
    super();
    this.input = <HTMLInputElement>document.querySelector('.editor__input');
    this.submitButton = <HTMLButtonElement>document.querySelector('.editor__button');

    this.on('reset', () => this.clearInput());
    this.on('changeLevel', () => this.clearInput());
    this.on('help', (answer) => this.hintInput(answer));
  }

  private clearInput(): void {
    this.input.value = '';
  }

  public listen(): void {
    this.submitButton.onclick = (): void => {
      this.emit('submit', this.input.value);
    };

    this.input.addEventListener('keydown', (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.emit('submit', this.input.value);
      }
    });
  }

  private async hintInput(answer: string): Promise<void> {
    this.input.placeholder = '';
    this.input.value = '';

    const delay = (ms: number): Promise<void> =>
      new Promise((res) => {
        setTimeout(res, ms);
      });

    for (const sym of answer) {
      await delay(50);
      this.input.value += sym;
    }
    this.input.placeholder = 'Type in a selector';
  }
}
