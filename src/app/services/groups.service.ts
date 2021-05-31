import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Group, ScouterRoleType} from '../models/group.model';
import {AuthenticationService} from './authentication.service';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, from, Observable} from 'rxjs';
import {joinKey} from '../utils/key';
import {DevelopmentArea, DevelopmentStage} from '../models/area-value';
import {environment} from '../../environments/environment';
import testGroups from '../data/test/groups.json';
import testStats from '../data/test/stats.json';
import {delay} from '../utils/async';
import {NotFoundError} from '../errors/http.error';


export interface DistrictGroupId {
  districtId: string;
  groupId: string;
}


export type LogParentTag = 'COMPLETED' | 'PROGRESS' | 'REWARD';

export interface ObjectiveKey {
  stage: DevelopmentStage;
  area: DevelopmentArea;
  line: number;
  subLine: number;
}


export type ObjectiveKeyTimed = ObjectiveKey & { timestamp: number };

export interface GroupStats {
  logCount: Record<LogParentTag, number>;
  progressLogs: Record<string, ProgressLog[]>;
  completedObjectives: Record<string, ObjectiveKeyTimed[]>;
}

export type ProgressLog = ObjectiveKeyTimed & { log: string; };

interface GroupStatsResponse {
  log_count: Record<LogParentTag, number>;
  progress_logs: Record<string, ProgressLog[]>;
  completed_objectives: Record<string, ObjectiveKeyTimed[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private api: ApiService, private auth: AuthenticationService) {
  }

  stats: Record<string, BehaviorSubject<GroupStats | null>> = {};

  roles: Record<ScouterRoleType, string> = {
    creator: 'Creador',
    scouter: 'Dirigente o Guiadora'
  };

  async getGroup(districtId: string, groupId: string): Promise<Group> {
    const user = this.auth.snapUser;
    if (!environment.production && user) {
      const group = testGroups.find(g => g.district === districtId && g.code === groupId) as Group;
      group.scouters[user.id] = {
        name: user.nickname ?? (user.firstName + user.lastName),
        role: 'creator'
      };
      await delay(2000);
      return group;
    }
    return await this.api.get<Group>(`/districts/${districtId}/groups/${groupId}/`);
  }

  async joinAsScouter(districtId: string, groupId: string, code: string): Promise<boolean> {
    if (!code || code.length === 0) {
      return false;
    }
    try {
      await this.api.post<{ message: string }>(
        `/districts/${districtId}/groups/${groupId}/scouters/join`, {code}
      );
    } catch (e) {
      return false;
    }
    return true;
  }

  getMyGroups(): Observable<Group[]> {
    return this.auth.user$.pipe(switchMap(user => combineLatest(user?.groups.map(id => {
      const districtId = id[0];
      const groupId = id[1];
      return from(this.getGroup(districtId, groupId));
    }) ?? [])));
  }

  public fetchGroupStats(districtId: string, groupId: string, useCache = true): BehaviorSubject<GroupStats | null> {

    const key = joinKey(districtId, groupId);
    let subject = this.stats[key];
    if (!subject || useCache) {
      if (!subject) {
        this.stats[key] = subject = new BehaviorSubject<GroupStats | null>(null);
      }

      let promise: Promise<GroupStatsResponse>;
      if (!environment.production) {
        promise = new Promise<GroupStatsResponse>(res => {
          const stats: GroupStatsResponse | undefined = (testStats as any)[districtId][groupId];
          if (!stats) {
            throw new NotFoundError();
          }
          return delay(2000).then(() => res(stats));
        });
      } else {
        promise = this.api.get<GroupStatsResponse>(`/districts/${districtId}/groups/${groupId}/stats/`);
      }
      promise.then(response => {
        subject.next({
          logCount: response.log_count,
          completedObjectives: response.completed_objectives,
          progressLogs: response.progress_logs
        });
      });
    }
    return subject;
  }

  public getScouterRoleName(role: ScouterRoleType): string {
    return this.roles[role];
  }

  getGroupStats(districtId: string, groupId: string): Observable<GroupStats | null> {
    return this.fetchGroupStats(districtId, groupId).asObservable();
  }

  queryLogs(districtId: string, groupId: string, includeProgress = true, includeCompleted = true): Observable<ObjectiveKeyTimed[]> {
    return this.getGroupStats(districtId, groupId).pipe(
      map(stats => {
        if (!stats) {
          return [];
        }
        return [
          ...(includeProgress ? Object.values(stats.progressLogs) : []),
          ...(includeCompleted ? Object.values(stats.completedObjectives) : [])
        ].reduce((prev, a) => [...prev, ...a]);
      })
    );
  }

  getGroupAreaRanking(districtId: string, groupId: string): Observable<DevelopmentArea[]> {
    return this.getGroupStats(districtId, groupId).pipe(
      map(stats => {
        if (!stats) {
          return [];
        }
        const logs = [
          ...Object.values(stats.progressLogs),
          ...Object.values(stats.completedObjectives)
        ].reduce((prev, a) => [...prev, ...a]);
        const count: Record<DevelopmentArea, number> = {
          affectivity: 0,
          character: 0,
          corporality: 0,
          creativity: 0,
          sociability: 0,
          spirituality: 0
        };
        logs.forEach(log => {
          count[log.area]++;
        });
        return (Object.keys(count) as DevelopmentArea[])
          .sort((a, b) => count[b] - count[a]);
      })
    );
  }

  getGroupLogHistory(
    districtId: string, groupId: string, every = 24 * 60 * 60 * 1000
  ): Observable<Record<LogParentTag, Record<number, ObjectiveKey[]>>> {
    return this.getGroupStats(districtId, groupId).pipe(
      map(stats => {
        if (!stats) {
          return {
            COMPLETED: [],
            PROGRESS: [],
            REWARD: {}
          };
        }
        const progress = Object.values(stats.progressLogs).reduce((prev, a) => [...prev, ...a], []);
        const completed = Object.values(stats.completedObjectives).reduce((prev, a) => [...prev, ...a], []);

        const progressHistory: Record<number, ObjectiveKey[]> = {};
        const completedHistory: Record<number, ObjectiveKey[]> = {};
        progress.forEach(p => {
          const rounded = Math.round(p.timestamp / every) * every;
          const prev = progressHistory[rounded] ?? [];
          progressHistory[rounded] = [...prev, p];
        });
        completed.forEach(p => {
          const rounded = Math.round(p.timestamp / every) * every;
          const prev = completedHistory[rounded] ?? [];
          completedHistory[rounded] = [...prev, p];
        });

        return {
          COMPLETED: completedHistory,
          PROGRESS: progressHistory,
          REWARD: {}
        };
      })
    );
  }

  countAreasActivity(districtId: string, groupId: string,
                     includeProgress = true, includeCompleted = true): Observable<Record<DevelopmentArea, number>> {
    return this.queryLogs(districtId, groupId, includeProgress, includeCompleted).pipe(
      map(logs => {
        const count: Record<DevelopmentArea, number> = {
          affectivity: 0,
          character: 0,
          corporality: 0,
          creativity: 0,
          sociability: 0,
          spirituality: 0
        };
        logs.forEach(log => {
          count[log.area]++;
        });
        return count;
      })
    );
  }
}
