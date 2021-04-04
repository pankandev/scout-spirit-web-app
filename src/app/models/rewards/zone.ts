import {BaseReward} from './base';

export interface ZoneDescription {
  code: string;
}

export interface ZoneReward extends BaseReward<ZoneDescription>{
  category: 'ZONE';
  description: ZoneDescription;
}
