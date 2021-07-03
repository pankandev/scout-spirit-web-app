import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {RouteParamsService} from '../../services/route-params.service';
import {BeneficiariesService} from '../../services/beneficiaries.service';
import {map, switchMap} from 'rxjs/operators';
import {ListItem} from '../../widgets/scrollable-list/scrollable-list.component';
import {joinKey} from '../../utils/key';
import {LogsService} from '../../services/logs.service';

@Component({
  selector: 'sspirit-beneficiary-registry',
  templateUrl: './beneficiary-registry.component.html',
  styleUrls: ['./beneficiary-registry.component.sass']
})
export class BeneficiaryRegistryComponent implements OnInit {
  beneficiaryId$: Observable<string>;
  logs$: Observable<ListItem[]>;

  constructor(
    private route: ActivatedRoute,
    private routeParams: RouteParamsService,
    private service: LogsService,
    private beneficiaries: BeneficiariesService
  ) {
    this.beneficiaryId$ = this.routeParams.beneficiaryId$;
    const objectiveFilter$ = this.route.queryParams.pipe(map(q => q.objective));
    this.logs$ = combineLatest([this.beneficiaryId$, objectiveFilter$]).pipe(
      switchMap(([beneficiaryId, objective]) => {
        return this.beneficiaries.queryLogs(beneficiaryId, objective ? [
          joinKey('PROGRESS', objective),
          joinKey('COMPLETED', objective)
        ] : undefined);
      }),
      map(logs => logs.map(log => service.parseLog(log))),
      map(logs =>
        logs.map(log =>
          ({
            id: joinKey(log.category, log.time.toMillis()),
            title: log.category,
            subtitle: log.log,
            icon: log.icon,
            time: log.time
          } as ListItem)))
    );
  }

  ngOnInit(): void {
  }
}
