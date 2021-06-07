import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {RouteParamsService} from '../../services/route-params.service';
import {BeneficiariesService} from '../../services/beneficiaries.service';
import {map, switchMap} from 'rxjs/operators';
import {ListItem} from '../../widgets/scrollable-list/scrollable-list.component';
import {joinKey} from '../../utils/key';

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
    private beneficiaries: BeneficiariesService
  ) {
    this.beneficiaryId$ = this.routeParams.beneficiaryId$;
    this.logs$ = this.beneficiaryId$.pipe(
      switchMap(beneficiaryId => {
        return this.beneficiaries.getLogs(beneficiaryId);
      }),
      map(logs => {
        return logs.map(log => {
          return {
            id: joinKey(log.tag, log.timestamp),
            title: log.tag,
            subtitle: log.log
          } as ListItem;
        });
      })
    );
  }

  ngOnInit(): void {
  }

}
