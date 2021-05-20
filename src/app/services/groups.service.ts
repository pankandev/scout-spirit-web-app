import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Group} from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private api: ApiService) {
  }

  async joinAsScouter(district: string, group: string, code: string): Promise<boolean> {
    if (!code || code.length === 0) {
      return false;
    }
    try {
      await this.api.post<{ message: string }>(
        `/districts/${district}/groups/${group}/scouters/join`, {code}
      );
    } catch (e) {
      return false;
    }
    return true;
  }

  async getGroup(districtId: string, groupId: string): Promise<Group> {
    return await this.api.get<Group>(`/districts/${districtId}/groups/${groupId}/`);
  }
}
