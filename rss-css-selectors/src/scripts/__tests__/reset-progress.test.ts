import ResetProgress from '../listeners/reset-progress';

describe('ResetProgress', () => {
  let resetProgress: ResetProgress;
  let resetButton: HTMLButtonElement;

  beforeAll(() => {
    resetButton = document.createElement('button');
    resetButton.classList.add('nav__button');
    document.body.appendChild(resetButton);

    resetProgress = new ResetProgress();
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('listen method should emit "reset" event on button click', () => {
    resetProgress.listen();
    const emitMock = jest.spyOn(resetProgress, 'emit');

    resetButton.click();

    expect(emitMock).toHaveBeenCalledWith('reset');

    emitMock.mockRestore();
  });
});
