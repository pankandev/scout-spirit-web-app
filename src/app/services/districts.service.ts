import {Injectable} from '@angular/core';
import {District} from '../models/group.model';
import {ApiService} from './api.service';
import {from, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DistrictsService {
  allDistricts$: Observable<District[]> = from(this.query()).pipe(shareReplay({refCount: true}));

  get(districtId: string): Observable<District | null> {
    return from(this.getAsync(districtId));
  }

  async getAsync(districtId: string): Promise<District | null> {
    return await this.api.get<District>(`/districts/${districtId}`);
  }

  private async query(): Promise<District[]> {
    return this.api.get<{items: District[]}>(`/districts/`).then(d => d.items);
  }

  constructor(private api: ApiService) {
  }
}
