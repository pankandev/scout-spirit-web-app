import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Group, ScouterRoleType} from '../models/group.model';
import {AuthenticationService} from './authentication.service';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, from, Observable} from 'rxjs';
import {joinKey} from '../utils/key';
import {DevelopmentArea, DevelopmentStage, Unit} from '../models/area-value';
import {environment} from '../../environments/environment';
import testGroups from '../data/test/groups.json';
import testStats from '../data/test/stats.json';
import {delay} from '../utils/async';
import {NotFoundError} from '../errors/http.error';
import {ObjectivesService} from './objectives.service';
import {mapNumbered} from '../utils/map';
import {RouteParamsService} from './route-params.service';


export interface DistrictGroupId {
  districtId: string;
  groupId: string;
}


export type LogParentTag = 'COMPLETED' | 'PROGRESS' | 'REWARD';

export interface ObjectiveKey {
  stage: DevelopmentStage;
  area: DevelopmentArea;
  line: number;
  subline: number;
}

export interface UnitKey {
  unit: Unit;
}

export interface TimestampKey {
  timestamp: number;
}

export type ObjectiveKeyTimed = ObjectiveKey & TimestampKey;
export type UnitObjectiveKeyTimed = ObjectiveKey & TimestampKey & UnitKey;

export interface GroupStats {
  logCount: Record<LogParentTag, number>;
  progressLogs: Record<string, ProgressLog[]>;
  completedObjectives: Record<string, UnitObjectiveKeyTimed[]>;
}

export type ProgressLog = UnitObjectiveKeyTimed & { log: string; };

interface GroupStatsResponse {
  log_count: Record<LogParentTag, number>;
  progress_logs: Record<string, ProgressLog[]>;
  completed_objectives: Record<string, UnitObjectiveKeyTimed[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private api: ApiService,
              private routeParams: RouteParamsService,
              private auth: AuthenticationService,
              private objectivesService: ObjectivesService
  ) {
  }

  stats: Record<string, BehaviorSubject<GroupStats | null>> = {};
  groupStats$ = this.routeParams.districtGroupId$.pipe(
    switchMap(params => this.fetchGroupStats(params.districtId, params.groupId)),
    shareReplay({refCount: true})
  );

  roles: Record<ScouterRoleType, string> = {
    creator: 'Creador',
    scouter: 'Dirigente o Guiadora'
  };

  logHistory$ = this.groupStats$.pipe(
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
        const prev = progressHistory[p.timestamp] ?? [];
        progressHistory[p.timestamp] = [...prev, p];
      });
      completed.forEach(p => {
        const prev = completedHistory[p.timestamp] ?? [];
        completedHistory[p.timestamp] = [...prev, p];
      });

      return {
        COMPLETED: completedHistory,
        PROGRESS: progressHistory,
        REWARD: {}
      };
    }),
    shareReplay()
  );

  ranking$ = this.groupStats$.pipe(
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

  private static groupLogs(logs: UnitObjectiveKeyTimed[]): Record<number, UnitObjectiveKeyTimed[]> {
    const count: Record<number, UnitObjectiveKeyTimed[]> = {};
    logs.forEach(l => {
      const prev = count[l.timestamp] ?? [];
      count[l.timestamp] = [...prev, l];
    });
    return count;
  }

  private static countLogs(
    logs: UnitObjectiveKeyTimed[],
    where?: (l: UnitObjectiveKeyTimed) => boolean
  ): Record<number, number> {
    return mapNumbered(
      this.groupLogs(logs),
      (l) => l.filter(where ?? (() => true)).length
    );
  }

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

  query(districtId?: string): Observable<Group[]> {
    return from(this.queryAsync(districtId));
  }

  async queryAsync(districtId?: string): Promise<Group[]> {
    const user = this.auth.snapUser;
    if (!environment.production && user) {
      const groups = testGroups.filter(g => !districtId || g.district === districtId) as Group[];
      await delay(2000);
      return groups;
    }
    const response = await this.api.get<{ items: Group[] }>(`/districts/${districtId}/groups/`);
    return response.items;
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

  queryLogs(includeProgress = true, includeCompleted = true): Observable<UnitObjectiveKeyTimed[]> {
    return this.groupStats$.pipe(
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

  countAreasActivity(districtId: string, groupId: string,
                     includeProgress = true, includeCompleted = true): Observable<Record<DevelopmentArea, number>> {
    return this.queryLogs(includeProgress, includeCompleted).pipe(
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

  public filterLogs(
    stage?: DevelopmentStage,
    area?: DevelopmentArea,
    line?: [number, number],
    includeProgress = false,
    includeCompleted = true
  ): Observable<ObjectiveKeyTimed[]> {
    return this.queryLogs(includeProgress, includeCompleted).pipe(
      map(
        logs => logs.filter(log =>
          (!stage || stage === log.stage) &&
          (!area || area === log.area) &&
          (!line || (line[0] === log.line && line[1] === log.subline))
        )
      )
    );
  }

  public getFilteredLogsDataset(
    stage: DevelopmentStage | null = null,
    unit: Unit | null = null,
    area: DevelopmentArea | null = null
  ): Observable<Record<string, Record<number, number>>> {
    return this.queryLogs().pipe(
      map(logs => {
        const dataset: Record<string, Record<number, number>> = {};
        if (stage) {
          const stageName = this.objectivesService.getStage(stage).name;
          dataset[`Objetivos cumplidos en la etapa "${stageName}"`] = GroupsService.countLogs(logs, (l) => l.stage === stage);
        }
        if (area) {
          const areaName = this.objectivesService.getArea(area).name;
          // noinspection JSNonASCIINames
          dataset[`Objetivos cumplidos en el área "${areaName}"`] = GroupsService.countLogs(logs, (l) => l.area === area);
        }
        return dataset;
      })
    );
  }

  public getFilteredLogsAreaDataset(
    unit: Unit | null = null,
    stage: DevelopmentStage | null = null
  ): Observable<Record<string, Record<number, number>>> {
    return this.queryLogs().pipe(
      map(logs => {
        const dataset: Record<string, Record<number, number>> = {};
        this.objectivesService.areas.forEach(area => {
          const areaName = this.objectivesService.getArea(area, unit ?? 'scouts').name;
          dataset[areaName] = GroupsService.countLogs(
            logs, (l) => l.area === area && (!stage || l.stage === stage) && (!unit || l.unit === unit)
          );
        });
        return dataset;
      })
    );
  }

  getFilteredLogsStageDataset(unit: Unit | null = null): Observable<Record<string, Record<number, number>>> {
    return this.queryLogs().pipe(
      map(logs => {
        const dataset: Record<string, Record<number, number>> = {};
        this.objectivesService.stages.forEach(stage => {
          const areaName = this.objectivesService.getStage(stage).name;
          dataset[areaName] = GroupsService.countLogs(
            logs, (l) => l.stage === stage && (!unit || l.unit === unit)
          );
        });
        return dataset;
      })
    );
  }

  async create(districtCode: string, groupCode: string, name: string): Promise<void> {
    await this.api.post(`/districts/${districtCode}/groups/`, {
      code: groupCode,
      name
    });
  }
}
