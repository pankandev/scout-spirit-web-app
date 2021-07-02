import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Beneficiary, BeneficiaryLite} from '../models/beneficiary.model';
import {DevelopmentStage, Unit} from '../models/area-value';
import {combineLatest, from, Observable} from 'rxjs';
import {Log, ObjectiveLog} from '../models/task.model';
import {GroupsService} from './groups.service';
import {filter, map} from 'rxjs/operators';
import {ObjectivesService} from './objectives.service';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {
  stages: Record<DevelopmentStage, string> = {
    prepuberty: 'Prepubertad',
    puberty: 'Pubertad'
  };
  units: Record<Unit, string> = {
    scouts: 'Tropa',
    guides: 'Compañía'
  };

  constructor(
    private api: ApiService,
    private groups: GroupsService,
    private objectives: ObjectivesService,
    private auth: AuthenticationService
  ) {
  }

  public async get(id: string): Promise<Beneficiary> {
    return await this.api.get<Beneficiary>(
      this.auth.isLoggedIn ? `/beneficiaries/${id}` : `/beneficiaries/${id}`
    );
  }

  public getStageDisplayName(stage: DevelopmentStage): string {
    return this.stages[stage];
  }

  public getUnitDisplayName(unit: Unit): string {
    return this.units[unit];
  }

  public async query(districtId: string, groupId: string, unit?: Unit): Promise<BeneficiaryLite[]> {
    let endpoint = `/districts/${districtId}/groups/${groupId}/beneficiaries/`;
    if (unit) {
      endpoint += unit + '/';
    }
    const response = await this.api.get<{ items: BeneficiaryLite[] }>(endpoint);
    return response.items;
  }

  getActiveTask(beneficiaryId: string, unit: Unit): Observable<ObjectiveLog | null> {
    const request: Promise<ObjectiveLog> = this.api.get<ObjectiveLog>(`/users/${beneficiaryId}/tasks/active`);
    return from(request).pipe(
      map((task) => {
        task['original-objective'] = ObjectivesService.transform(task['original-objective'], unit);
        task['personal-objective'] = ObjectivesService.transform(task['personal-objective'] ?? task['original-objective'],
          unit);
        return task;
      })
    );
  }

  getTasks(beneficiaryId: string): Observable<ObjectiveLog[]> {
    const tasks: Promise<{ items: ObjectiveLog[] }> = this.api.get<{ items: ObjectiveLog[] }>(`/users/${beneficiaryId}/tasks/`);

    return combineLatest([tasks, this.get(beneficiaryId)]).pipe(
      filter(([logs, _]) => !!logs),
      map(([logs, beneficiary]) => {
        logs.items.forEach((l) => {
          l['original-objective'] = ObjectivesService.transform(l['original-objective'], beneficiary.unit);
        });
        return logs.items;
      })
    );
  }

  async getLogs(beneficiaryId: string): Promise<Log[]> {
    const logs = await this.api.get<{ items: Log[] }>(`/users/${beneficiaryId}/logs/`);
    const items = logs.items;
    items.sort((a, b) => b.timestamp - a.timestamp);
    return items;
  }
}
