import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Reward} from '../models/rewards/reward';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(private api: ApiService) {
  }

  async create(reward: Reward): Promise<Reward> {
    const response = await this.api.post<{item: Reward}>(`rewards/${reward.category}/${reward.release}/`, {
      category: reward.category,
      release: reward.release,
      rarity: reward.rarity,
      description: reward.description,
    });
    return response.item;
  }
}
