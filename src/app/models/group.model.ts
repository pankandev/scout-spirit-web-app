export type ScouterRoleType = 'creator' | 'scouter';

export interface ScouterRole {
  name: string;
  role: ScouterRoleType;
}

export interface Group {
  district: string;
  code: string;
  name: string;
  scouters: Record<string, ScouterRole>;
  scouters_code: string;
}

export interface District {
  code: string;
  name: string;
}
