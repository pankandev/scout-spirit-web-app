import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DistrictGroupId, GroupsService, GroupStats, ObjectiveKey} from '../../../services/groups.service';
import {map, switchMap} from 'rxjs/operators';
import {RouteParamsService} from '../../../services/route-params.service';
import {ActivatedRoute} from '@angular/router';
import {DevelopmentArea} from '../../../models/area-value';

@Component({
  selector: 'sspirit-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit {
  stats$: Observable<GroupStats | null>;
  nBeneficiaries$: Observable<number>;
  logCount$: Observable<Record<string, Record<number, number>>>;
  ranking$: Observable<DevelopmentArea[]>;

  constructor(private routeParams: RouteParamsService, private route: ActivatedRoute, private service: GroupsService) {
    const params$ = this.routeParams.getAggregatedParams<DistrictGroupId>(route);
    this.stats$ = params$.pipe(
      switchMap(params => {
        return service.getGroupStats(params.districtId, params.groupId);
      })
    );
    this.nBeneficiaries$ = this.stats$.pipe(map(stats => Object.keys(stats?.progressLogs ?? {}).length));
    this.logCount$ = params$.pipe(
      switchMap(params => service.getGroupLogHistory(params.districtId, params.groupId)),
      map(history => ({
        'Objetivos completados': this.countHistory(history.COMPLETED),
        'Registros realizados': this.countHistory(history.PROGRESS),
        'Total de actividad': this.countHistory(this.mergeHistories(history.PROGRESS, history.COMPLETED)),
      }))
    );
    this.ranking$ = params$.pipe(
      switchMap(params => {
        return service.getGroupAreaRanking(params.districtId, params.groupId);
      })
    );
  }

  mergeHistories(...histories: Record<number, ObjectiveKey[]>[]): Record<number, ObjectiveKey[]> {
    const merged: Record<number, ObjectiveKey[]> = {};

    let history: Record<number, ObjectiveKey[]>;
    for (history of histories) {
      let timestamp: string | number;
      for (timestamp in history) {
        if (!history.hasOwnProperty(timestamp)) {
          continue;
        }
        timestamp = parseInt(timestamp, 10);
        const prev: ObjectiveKey[] = merged[timestamp] ?? [];
        merged[timestamp] = [...prev, ...history[timestamp]];
      }
    }
    return merged;
  }

  countHistory(history: Record<number, ObjectiveKey[]>): Record<number, number> {
    const entries = Object.entries(history);

    const count: Record<string, number> = {};
    entries.forEach(entry => {
      count[entry[0]] = entry[1].length;
    });
    return count;
  }

  ngOnInit(): void {
  }
}
