export type DevelopmentStage = 'puberty' | 'prepuberty';

export type Unit = 'scouts' | 'guides';

export type DevelopmentArea =
  'corporality'
  | 'creativity'
  | 'character'
  | 'affectivity'
  | 'sociability'
  | 'spirituality';

export type AreaValue<T> = Record<DevelopmentArea, T>;
