export function set<T>(name: string, value: T): void {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function get<T>(name: string, substitude: string): T {
  const options = window.localStorage.getItem(name);
  const parsed = JSON.parse(options || substitude) as T;

  return parsed;
}

export function del(name: string): void {
  localStorage.removeItem(name);
}
