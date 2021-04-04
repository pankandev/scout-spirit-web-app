export type RewardCategory = 'AVATAR' | 'DECORATION' | 'NEEDS' | 'POINTS' | 'ZONE';
export type RewardRarity = 'COMMON' | 'RARE';

export interface BaseReward<T> {
  release: number;
  id?: number;
  description: T;
  category: RewardCategory;
  rarity: RewardRarity;
}
