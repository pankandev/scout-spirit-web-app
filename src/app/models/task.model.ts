export interface SubTask {
  completed: boolean;
  description: string;
}

export interface Task {
  completed: boolean;
  created: number;
  objective: string;
  originalObjective: string;
  personalObjective: string;
  tasks: SubTask[];
}
