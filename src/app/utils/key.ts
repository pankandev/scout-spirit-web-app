const SPLITTER = '::';

export function joinKey(...key: string[]): string {
  return key.join(SPLITTER);
}

export function splitKey(key: string): string[] {
  return key.split(SPLITTER);
}
