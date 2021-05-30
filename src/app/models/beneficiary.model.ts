import {DevelopmentArea, DevelopmentStage, Unit} from './area-value';
import { Task } from './task.model';

export interface BeneficiaryLite {
  id: string;
  district: string;
  group: string;
  profile_picture: string | null;
  unit: Unit;
  fullName: string;
  nickname: string;
  stage: DevelopmentStage;
  birthdate: string;
}

export interface Beneficiary extends BeneficiaryLite {
  target: Task | null;
  score: Record<DevelopmentArea, number>;
  nTasks: Record<DevelopmentArea, number>;
  lastClaimedToken: number;
  setBaseTasks: boolean;
}
