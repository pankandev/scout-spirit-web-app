import {BaseReward} from './base';

export type AvatarType = 'pants' | '';

export interface AvatarDescription {
  type: AvatarType;
  code: string;
}

export interface AvatarReward extends BaseReward<AvatarDescription>{
  category: 'AVATAR';
  description: AvatarDescription;
}
