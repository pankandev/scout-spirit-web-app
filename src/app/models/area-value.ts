export type DevelopmentArea =
  'corporality'
  | 'creativity'
  | 'character'
  | 'affectivity'
  | 'sociability'
  | 'spirituality';

export type AreaValue<T> = Record<DevelopmentArea, T>;
