import {Component, OnInit} from '@angular/core';
import {BeneficiariesService} from '../../../services/beneficiaries.service';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {BeneficiaryLite} from '../../../models/beneficiary.model';
import {map, switchMap} from 'rxjs/operators';
import {Unit} from '../../../models/area-value';
import {ListItem} from '../../../widgets/scrollable-list/scrollable-list.component';
import {RouteParamsService} from '../../../services/route-params.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupsService} from '../../../services/groups.service';
import {AlertService} from '../../../services/alert.service';
import {Group} from '../../../models/group.model';

@Component({
  selector: 'sspirit-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.sass']
})
export class BeneficiariesComponent implements OnInit {
  items$: Observable<ListItem[]>;
  beneficiaries$: Observable<BeneficiaryLite[]>;
  selectedBeneficiary$: Observable<string | null>;
  beneficiaryCode$: Observable<string>;
  group$: Observable<Group>;

  constructor(
    private route: ActivatedRoute,
    private routeParams: RouteParamsService,
    private service: BeneficiariesService,
    private groups: GroupsService,
    private alerts: AlertService,
    private router: Router,
    private modal: NgbModal
  ) {
    const ids$ = combineLatest([this.routeParams.districtId$, this.routeParams.groupId$, this.route.params])
      .pipe(map(([d, g, u]) => ({
        districtId: d,
        groupId: g,
        unit: u.unit && u.unit === 'scouts' || u.unit === 'guides' ? u.unit as Unit : undefined
      })));
    this.beneficiaries$ = ids$.pipe(
      switchMap(ids => this.service.query(ids.districtId, ids.groupId, ids.unit))
    );
    this.selectedBeneficiary$ = this.routeParams.aggregatedParams$.pipe(
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
    this.group$ = this.groups.group$;
    this.beneficiaryCode$ = this.groups.group$.pipe(
      map(group => group.beneficiaryCode)
    );
  }

  ngOnInit(): void {
  }

  async onSelectedItem(beneficiaryId: string): Promise<void> {
    await this.router.navigate(
      ['/districts', this.routeParams.districtId, 'groups', this.routeParams.groupId, 'dashboard', 'beneficiaries', 'b', beneficiaryId]
    );
  }

  openModal(content: any): void {
    this.modal.open(content);
  }

  onClipboardResult(result: boolean): void {
    this.alerts.showSnackbar(result ? 'Código copiado en portapapeles' : 'Algo ocurrió copiando enlace');
  }
}
