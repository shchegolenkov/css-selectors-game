/* eslint-disable max-lines-per-function */
import InputCss from '../listeners/input-css';

describe('InputCss', () => {
  let inputCss: InputCss;
  let input: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeAll(() => {
    input = document.createElement('input');
    input.classList.add('editor__input');
    document.body.appendChild(input);

    submitButton = document.createElement('button');
    submitButton.classList.add('editor__button');
    document.body.appendChild(submitButton);

    inputCss = new InputCss();
    inputCss.listen();
  });

  beforeEach(() => {
    input.value = '';
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  describe('listen', () => {
    it('should emit "submit" event with the input value when submitButton is clicked', () => {
      const emitMock = jest.spyOn(inputCss, 'emit');
      input.value = 'Test input text';
      submitButton.click();

      expect(emitMock).toHaveBeenCalledWith('submit', 'Test input text');

      emitMock.mockRestore();
    });

    it('should emit "submit" event with the input value when Enter key is pressed inside the input', () => {
      const emitMock = jest.spyOn(inputCss, 'emit');
      input.value = 'Test input text';

      const enterKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      input.dispatchEvent(enterKeyEvent);

      expect(emitMock).toHaveBeenCalledWith('submit', 'Test input text');

      emitMock.mockRestore();
    });
  });

  describe('on', () => {
    it('should register event listeners for the specified events', () => {
      const resetListener = jest.fn();
      const changeLevelListener = jest.fn();
      const helpListener = jest.fn();

      inputCss.on('reset', resetListener);
      inputCss.on('changeLevel', changeLevelListener);
      inputCss.on('help', helpListener);

      inputCss.emit('reset');
      inputCss.emit('changeLevel');
      inputCss.emit('help', 'Test input text');

      expect(resetListener).toHaveBeenCalled();
      expect(changeLevelListener).toHaveBeenCalled();
      expect(helpListener).toHaveBeenCalledWith('Test input text');
    });
  });

  describe('clearInput', () => {
    it('should clear the input value', () => {
      input.value = 'Sample Input';

      inputCss['clearInput']();

      expect(input.value).toBe('');
    });
  });
});
