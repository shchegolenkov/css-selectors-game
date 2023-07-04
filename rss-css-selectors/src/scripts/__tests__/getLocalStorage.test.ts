import { getLocalStorage } from '../localStorage';

describe('getLocalStorage', () => {
  it('should return the value from localStorage for a given key', () => {
    const key = 'testKey';
    const value = 'testValue';
    localStorage.setItem(key, value);

    const result = getLocalStorage(key);

    expect(result).toEqual(value);
  });

  it('should return null if the key does not exist in localStorage', () => {
    const key = 'fakeKey';

    const result = getLocalStorage(key);

    expect(result).toBeNull();
  });
});
