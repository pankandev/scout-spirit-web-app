import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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
    this.logs$ = this.beneficiaryId$.pipe(
      switchMap(beneficiaryId => {
        return this.beneficiaries.getLogs(beneficiaryId);
      }),
      map(logs => logs.map(log => service.parseLog(log))),
      map(logs => {
        return logs.map(log => {
          return {
            id: joinKey(log.category, log.time.toMillis()),
            title: log.category,
            subtitle: log.log,
            icon: log.icon,
            time: log.time
          } as ListItem;
        });
      })
    );
  }

  ngOnInit(): void {
  }

}
