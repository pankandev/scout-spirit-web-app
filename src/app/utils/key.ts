const SPLITTER = '::';

export function joinKey(...key: any[]): string {
  return key.map(k => k.toString()).join(SPLITTER);
}

export function splitKey(key: string): string[] {
  return key.split(SPLITTER);
}
