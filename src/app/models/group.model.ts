export interface ScouterRole {
  name: string;
  role: 'creator' | 'scouter';
}

export interface Group {
  district: string;
  code: string;
  name: string;
  scouters: Record<string, ScouterRole>;
}
