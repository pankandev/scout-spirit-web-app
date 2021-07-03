import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteParamsService} from '../../services/route-params.service';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
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
    private router: Router,
    private route: ActivatedRoute,
    private routeParams: RouteParamsService,
    private beneficiaries: BeneficiariesService
  ) {
    this.beneficiaryId$ = this.routeParams.beneficiaryId$;
    this.route.queryParams.pipe(map(q => q.objective));
    this.tasks$ = this.beneficiaryId$.pipe(
      switchMap(beneficiaryId => {
        return this.beneficiaries.getTasks(beneficiaryId);
      })
    );
  }

  ngOnInit(): void {
  }

  private get beneficiaryId(): string {
    return this.routeParams.aggregatedParamsSnap.userId;
  }

  async showRegisters(task: ObjectiveLog): Promise<void> {
    await this.router.navigate(
      ['/districts', this.routeParams.districtId, 'groups', this.routeParams.groupId, 'dashboard', 'beneficiaries', 'b', this.beneficiaryId, 'file', 'registry'],
      {queryParams: {objective: task.objective}}
    );
  }
}
