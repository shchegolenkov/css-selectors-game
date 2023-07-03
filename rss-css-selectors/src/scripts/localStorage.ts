export function setLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function getLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}

export function setObjLocalStorage(key: string, value: string[]): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getObjLocalStorage(key: string): string[] | null {
  const data = localStorage.getItem(key);
  if (data !== null) return JSON.parse(data);
  return null;
}
