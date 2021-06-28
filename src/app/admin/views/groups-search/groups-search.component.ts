import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupsService} from '../../../services/groups.service';
import {Observable, of, Subscription} from 'rxjs';
import {District, Group} from '../../../models/group.model';
import {catchError, distinctUntilChanged, map, share, startWith, switchMap} from 'rxjs/operators';
import {DistrictsService} from '../../../services/districts.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Case from 'case';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'sspirit-groups-search',
  templateUrl: './groups-search.component.html',
  styleUrls: ['./groups-search.component.sass']
})
export class GroupsSearchComponent implements OnInit, OnDestroy {
  district$: Observable<District | null>;
  groups$: Observable<Group[] | null>;
  allDistricts$: Observable<District[]>;
  group$: Observable<Group | null>;

  groupCodeControl = new FormControl('', [Validators.required, Validators.min(6), Validators.pattern('[a-z][a-z0-9-]+')]);
  districtCodeControl = new FormControl(null, [Validators.required]);
  groupNameControl = new FormControl('', [Validators.required, Validators.min(2)]);

  subscription: Subscription = new Subscription();

  isLoading = false;

  form = new FormGroup({
    groupCode: this.groupCodeControl,
    districtCode: this.districtCodeControl,
    groupName: this.groupNameControl
  });

  creatorEmailControl = new FormControl('', [Validators.required, Validators.email]);
  creatorForm = new FormGroup({
    email: this.creatorEmailControl
  });

  openModal(content: TemplateRef<any>): void {
    this.modal.open(content);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groups: GroupsService,
    private districts: DistrictsService,
    private modal: NgbModal,
    private alerts: AlertService
  ) {
    const districtParam: Observable<string | null> = this.route.queryParams.pipe(
      map(params => params.district ?? null),
      distinctUntilChanged(),
      share()
    );
    this.district$ = districtParam.pipe(
      switchMap(districtId => !!districtId ?
        this.districts.get(districtId).pipe(
          catchError(_ => of(null)),
          startWith(null)) :
        of(null)
      ),
      share()
    );
    this.groups$ = this.district$.pipe(
      switchMap(d => !!d ? this.groups.query(d.code).pipe(
        catchError(_ => of([])),
        startWith(null)
      ) : of([])),
    );
    this.group$ = this.route.queryParams.pipe(
      map(params => [params.group ?? null, params.district ?? null] as [string | null, string | null]),
      switchMap(([g, d]) => !!g && !!d ? this.groups.getGroup(d, g) : of(null)),
      catchError(_ => of(null))
    );
    this.allDistricts$ = this.districts.allDistricts$;
  }

  async selectGroup(group: Group | null): Promise<void> {
    await this.router.navigate([], {queryParams: {group: group?.code}, queryParamsHandling: 'merge'});
  }

  async filterByDistrict(districtId: string | null): Promise<void> {
    await this.router.navigate([], {queryParams: {district: districtId}, queryParamsHandling: 'merge'});
  }

  async createGroup(): Promise<void> {
    const districtId = this.districtCodeControl.value;
    const groupCode = this.groupCodeControl.value;
    const name = this.groupNameControl.value;

    this.isLoading = true;
    try {
      await this.groups.create(districtId, groupCode, name);
    } catch (e) {
      this.isLoading = false;
      this.alerts.showSnackbar('Error creando grupo');
      throw e;
    }
    this.alerts.showSnackbar('Grupo creado');
    this.modal.dismissAll();
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.groupNameControl.valueChanges.subscribe((value: string) => {
        if (!this.groupCodeControl.touched) {
          this.groupCodeControl.setValue(Case.kebab(value));
        }
      })
    );
  }

  async init(group: Group): Promise<void> {
    const email = this.creatorEmailControl.value;

    this.creatorForm.disable();
    try {
      await this.groups.init(group.district, group.code, email);
    } catch (e) {
      this.creatorForm.enable();
      throw e;
    }
    this.creatorForm.enable();
  }
}
