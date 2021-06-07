export interface SubTask {
  completed: boolean;
  description: string;
}

export interface ObjectiveLog {
  completed: boolean;
  created: number;
  objective: string;
  originalObjective: string;
  personalObjective: string;
  tasks: SubTask[];
}

export type LogTag = 'PROGRESS' | 'REWARD' | 'COMPLETED' | string;

export interface Log {
  tag: LogTag;
  user: string;
  log: string;
  timestamp: number;
}
