import {DevelopmentArea, DevelopmentStage, Unit} from './area-value';
import { ObjectiveLog } from './task.model';

export interface BeneficiaryLite {
  id: string;
  district: string;
  group: string;
  profilePicture: string | null;
  unit: Unit;
  fullName: string;
  nickname: string;
  stage: DevelopmentStage;
  birthdate: string;
  nTasks: Record<DevelopmentArea, number>;
}

export interface Beneficiary extends BeneficiaryLite {
  target: ObjectiveLog | null;
  score: Record<DevelopmentArea, number>;
  lastClaimedToken: number;
  setBaseTasks: boolean;
}
