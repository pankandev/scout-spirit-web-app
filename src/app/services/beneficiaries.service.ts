import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Beneficiary, BeneficiaryLite} from '../models/beneficiary.model';
import {DevelopmentStage, Unit} from '../models/area-value';
import {environment} from '../../environments/environment';
import testBeneficiaries from '../data/test/beneficiaries.json';
import {delay} from '../utils/async';
import {combineLatest, Observable} from 'rxjs';
import {Task} from '../models/task.model';
import {GroupsService} from './groups.service';
import {filter, map} from 'rxjs/operators';
import {ObjectivesService} from './objectives.service';

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

  constructor(private api: ApiService, private groups: GroupsService, private objectives: ObjectivesService) {
  }

  public async get(id: string): Promise<Beneficiary> {
    if (!environment.production) {
      await delay(1000);
      return ApiService.toCamelCase(testBeneficiaries.find(b => b.id === id)) as Beneficiary;
    }
    return await this.api.get<Beneficiary>(`/beneficiaries/${id}`);
  }

  public getStageDisplayName(stage: DevelopmentStage): string {
    return this.stages[stage];
  }

  public getUnitDisplayName(unit: Unit): string {
    return this.units[unit];
  }

  public async query(districtId: string, groupId: string, unit?: Unit): Promise<BeneficiaryLite[]> {
    if (!environment.production) {
      await delay(2000);
      return testBeneficiaries.filter(
        b => b.district === districtId && b.group === groupId && (!unit || b.unit === unit)
      ).map(b => ApiService.toCamelCase(({
        ...b,
        unit: b.unit as Unit,
        stage: b.stage as DevelopmentStage
      })));
    }
    let endpoint = `/districts/${districtId}/groups/${groupId}/beneficiaries/`;
    if (unit) {
      endpoint += unit + '/';
    }
    const response = await this.api.get<{ items: BeneficiaryLite[] }>(endpoint);
    return response.items;
  }

  getTasks(beneficiaryId: string): Observable<Task[]> {
    return combineLatest([this.groups.groupStats$, this.get(beneficiaryId)]).pipe(
      filter(([logs, _]) => !!logs),
      map(([logs, beneficiary]) => {
        return logs?.completedObjectives[beneficiaryId]?.map(l => this.objectives.objectiveToTask(l, beneficiary.unit)) ?? [];
      })
    );
  }
}
