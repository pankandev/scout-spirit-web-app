export interface SubTask {
  completed: boolean;
  description: string;
}

export interface ObjectiveLog {
  completed: boolean;
  created: number;
  objective: string;
  'original-objective': string;
  'personal-objective': string | null;
  tasks: SubTask[];
}

export type LogTag = 'progress' | 'reward' | 'completed' | string;

export interface Log {
  tag: LogTag;
  user: string;
  log: string;
  timestamp: number;
}
