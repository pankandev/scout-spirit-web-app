import {Component, OnInit} from '@angular/core';
import {BeneficiariesService} from '../../../services/beneficiaries.service';
import {ActivatedRoute} from '@angular/router';
import {AppError} from '../../../errors/app.error';
import {combineLatest, Observable} from 'rxjs';
import {BeneficiaryLite} from '../../../models/beneficiary.model';
import {map, switchMap} from 'rxjs/operators';
import {Unit} from '../../../models/area-value';

@Component({
  selector: 'sspirit-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.sass']
})
export class BeneficiariesComponent implements OnInit {
  beneficiaries$: Observable<BeneficiaryLite[]>;

  constructor(private route: ActivatedRoute, private service: BeneficiariesService) {
    const groupRoute = this.route.parent?.parent;
    const districtRoute = this.route.parent?.parent?.parent;
    const unitRoute = this.route;
    if (!districtRoute) {
      throw new AppError('District route not found');
    }
    if (!groupRoute) {
      throw new AppError('Group route not found');
    }
    const ids$ = combineLatest([districtRoute.params, groupRoute.params, unitRoute.params])
      .pipe(map(([d, g, u]) => ({
        districtId: d.districtId as string,
        groupId: g.groupId as string,
        unit: u.unit && u.unit === 'scouts' || u.unit === 'guides' ? u.unit as Unit : undefined
      })));
    this.beneficiaries$ = ids$.pipe(
      switchMap(ids => this.service.query(ids.districtId, ids.groupId, ids.unit))
    );
  }

  ngOnInit(): void {
  }
}
