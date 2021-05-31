import {Component, OnInit} from '@angular/core';
import {BeneficiariesService} from '../../../services/beneficiaries.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppError} from '../../../errors/app.error';
import {combineLatest, Observable} from 'rxjs';
import {BeneficiaryLite} from '../../../models/beneficiary.model';
import {map, switchMap} from 'rxjs/operators';
import {Unit} from '../../../models/area-value';
import {ListItem} from '../../../widgets/scrollable-list/scrollable-list.component';
import {RouteParamsService} from '../../../services/route-params.service';

@Component({
  selector: 'sspirit-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.sass']
})
export class BeneficiariesComponent implements OnInit {
  items$: Observable<ListItem[]>;
  beneficiaries$: Observable<BeneficiaryLite[]>;
  selectedBeneficiary$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private routeParams: RouteParamsService,
    private service: BeneficiariesService,
    private router: Router
  ) {
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
    this.selectedBeneficiary$ = this.routeParams.getAggregatedParams<{ userId?: string }>(route).pipe(
      map(params => params.userId ?? null)
    );
    this.items$ = this.beneficiaries$.pipe(
      map(beneficiaries => beneficiaries.map(b => ({
        id: b.id,
        title: `${b.fullName} (${b.nickname})`,
        subtitle: this.service.getUnitDisplayName(b.unit) + ' - ' + this.service.getStageDisplayName(b.stage),
        imageUrl: b.profilePicture
      })))
    );
  }

  ngOnInit(): void {
  }

  async onSelectedItem(beneficiaryId: string): Promise<void> {
    const params = this.routeParams.getAggregatedParamsSnap<{ districtId: string, groupId: string }>(this.route);
    await this.router.navigate(
      ['/districts', params.districtId, 'groups', params.groupId, 'dashboard', 'beneficiaries', 'b', beneficiaryId]
    );
  }
}
