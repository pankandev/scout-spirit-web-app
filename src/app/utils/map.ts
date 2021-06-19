export function mapNumbered<TS, TD>(obj: Record<number, TS>, map: (v: TS) => TD): Record<number, TD> {
  const mapped: Record<number, TD> = {};
  Object.entries(obj).forEach(([k, v]) => {
    mapped[parseInt(k, 10)] = map(v);
  });
  return mapped;
}

export function mapKeys<TK extends string, TS, TD>(obj: Record<TK, TS>, map: (v: TS, a: TK) => TD): Record<TK, TD> {
  const keys: TK[] = Object.keys(obj) as TK[];
  const mapped: Record<TK, TD> = {} as Record<TK, TD>;
  keys.forEach(key => {
    mapped[key] = map(obj[key], key);
  });
  return mapped;
}

export function entriesNumbered<T>(obj: Record<number, T>): [number, T][] {
  return Object.entries(obj)
    .map(([k, v]) => [parseInt(k, 10), v] as [number, T])
    .sort(([a, _], [b, __]) => a - b);
}

export function keysNumbered<T>(obj: Record<number, T>): number[] {
  return Object.keys(obj)
    .map(k => parseInt(k, 10))
    .sort((a, b) => a - b);
}

export function mapNumberedKeys<T>(obj: Record<number, T>, map: (v: number) => number, merge: (a: T, b: T) => T): Record<number, T> {
  const mapped: Record<number, T> = {};
  Object.entries(obj).forEach(([k, v]) => {
    const key = map(parseInt(k, 10));
    const oldValue = mapped[key];
    if (oldValue) {
      mapped[key] = merge(oldValue, v);
    } else {
      mapped[key] = v;
    }
  });
  return mapped;
}
