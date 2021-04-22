import {BaseReward} from './base';

export type AvatarPartType = 'pants' | 'shirt' | 'neckerchief' | 'eye' | 'mouth';
export type AvatarShirtType = 'common' | 'shirt' | 't-shirt';

/* Detail Avatar Part Description */
export interface AvatarPantsDescription {
  material: string;
}

export interface AvatarShirtDescription {
  type: AvatarShirtType;
  material: string;
}

export interface AvatarNeckerchiefDescription {
  material: string;
}

export interface AvatarEyeDescription {
  material: string;
}

export interface AvatarMouthDescription {
  material: string;
}

/* Avatar Parts Descriptions */
export interface BaseAvatarPartDescription {
  type: AvatarPartType;
  description: any;
}

export interface AvatarNeckerchief extends BaseAvatarPartDescription {
  type: 'neckerchief';
  description: AvatarNeckerchiefDescription;
}


export interface AvatarPants extends BaseAvatarPartDescription {
  type: 'pants';
  description: AvatarPantsDescription;
}

export interface AvatarMouth extends BaseAvatarPartDescription {
  type: 'mouth';
  description: AvatarMouthDescription;
}

export interface AvatarEye extends BaseAvatarPartDescription {
  type: 'eye';
  description: AvatarEyeDescription;
}

export interface AvatarShirt extends BaseAvatarPartDescription {
  type: 'shirt';
  description: AvatarShirtDescription;
}

export type AvatarPart = AvatarPants | AvatarMouth | AvatarEye | AvatarShirt | AvatarNeckerchief;

export interface AvatarReward extends BaseReward<BaseAvatarPartDescription>{
  category: 'AVATAR';
  description: AvatarPart;
}
