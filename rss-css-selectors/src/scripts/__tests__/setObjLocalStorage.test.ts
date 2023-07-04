import { setObjLocalStorage } from '../localStorage';

describe('setObjLocalStorage', () => {
  it('should set an object in localStorage', () => {
    const key = 'testKey';
    const value = ['testValue1', 'testValue2'];

    setObjLocalStorage(key, value);
    const storedValue = JSON.parse(localStorage.getItem(key) || '');

    expect(storedValue).toEqual(value);
  });
});
