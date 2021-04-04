import {BaseReward} from './base';

export interface DecorationDescription {
  code: string;
  type: string;
}

export interface DecorationReward extends BaseReward<DecorationDescription>{
  category: 'DECORATION';
  description: DecorationDescription;
}
