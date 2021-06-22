import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Reward} from '../models/rewards/reward';
import {from, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(private api: ApiService) {
  }

  async create(reward: Reward): Promise<Reward> {
    const response = await this.api.post<{item: Reward}>(`/rewards/${reward.category}/${reward.release}/`, {
      category: reward.category,
      release: reward.release,
      rarity: reward.rarity,
      description: reward.description,
    });
    return response.item;
  }

  query(category: string): Observable<Reward[]> {
    return from(this.api.get<{items: Reward[]}>(`/rewards/${category}/${environment.release}/`)).pipe(
      map(items => items.items)
    );
  }
}
