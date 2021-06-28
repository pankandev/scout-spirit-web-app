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
  scoutersCode: string;
  beneficiaryCode: string;
}

export interface District {
  code: string;
  name: string;
}
