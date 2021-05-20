export interface ScouterRole {
  fullName: string;
  role: 'creator' | 'scouter';
}

export interface Group {
  name: string;
  scouters: ScouterRole;
}
