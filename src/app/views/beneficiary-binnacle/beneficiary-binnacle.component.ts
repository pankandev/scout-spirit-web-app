import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteParamsService} from '../../services/route-params.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {BeneficiariesService} from '../../services/beneficiaries.service';
import {ObjectiveLog} from '../../models/task.model';

@Component({
  selector: 'sspirit-beneficiary-binnacle',
  templateUrl: './beneficiary-binnacle.component.html',
  styleUrls: ['./beneficiary-binnacle.component.sass']
})
export class BeneficiaryBinnacleComponent implements OnInit {
  beneficiaryId$: Observable<string>;
  tasks$: Observable<ObjectiveLog[]>;

  constructor(
    private route: ActivatedRoute,
    private routeParams: RouteParamsService,
    private beneficiaries: BeneficiariesService
  ) {
    this.beneficiaryId$ = this.routeParams.beneficiaryId$;
    this.tasks$ = this.beneficiaryId$.pipe(
      switchMap(beneficiaryId => {
        return this.beneficiaries.getTasks(beneficiaryId);
      })
    );
  }

  ngOnInit(): void {
  }
}
