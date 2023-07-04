import { setLocalStorage } from '../localStorage';

describe('setLocalStorage', () => {
  it('should set the value in localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    const mockSetItem = jest.fn();

    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: mockSetItem,
      },
      writable: true,
    });

    setLocalStorage(key, value);

    expect(mockSetItem).toHaveBeenCalledWith(key, value);
  });
});
