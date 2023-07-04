import { getObjLocalStorage } from '../localStorage';

describe('getObjLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return null for non-existent key', () => {
    const key = 'fakeKey';
    const result = getObjLocalStorage(key);

    expect(result).toBeNull();
  });

  it('should return parsed object for existing key', () => {
    const key = 'testKey';
    const value = ['testValue1', 'testValue2'];

    localStorage.setItem(key, JSON.stringify(value));
    const result = getObjLocalStorage(key);

    expect(result).toEqual(value);
  });
});
