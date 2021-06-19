import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {from, Observable, of, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {BeneficiariesService} from '../../../services/beneficiaries.service';
import {Beneficiary} from '../../../models/beneficiary.model';
import {RouteParamsService} from '../../../services/route-params.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sspirit-beneficiaries-summary',
  templateUrl: './beneficiaries-summary.component.html',
  styleUrls: ['./beneficiaries-summary.component.sass']
})
export class BeneficiariesSummaryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('details') details?: ElementRef;

  beneficiaryId$: Observable<string | null>;
  beneficiary$: Observable<Beneficiary | null>;
  subscription = new Subscription();

  openedModal$: Observable<boolean>;

  closeSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private routeParams: RouteParamsService,
    public service: BeneficiariesService
  ) {
    this.beneficiaryId$ = route.params.pipe(
      map(params => params.userId ?? null)
    );
    this.beneficiary$ = this.beneficiaryId$.pipe(
      switchMap(id => id ? from(service.get(id)).pipe(startWith(null)) : of(null))
    );
    this.openedModal$ = this.routeParams.url$.pipe(
      map(() => {
        return !!this.route.firstChild;
      }),
      distinctUntilChanged()
    );
  }

  get beneficiaryId(): string {
    return this.routeParams.beneficiaryId;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.routeParams.url$.subscribe(() => this.updateModalStatus())
    );
  }

  ngAfterViewInit(): void {
    this.updateModalStatus();
  }

  get shouldOpenModal(): boolean {
    const child = this.route.firstChild;
    if (!child) {
      return false;
    }
    const lastUrl = child.snapshot.url.length > 0 ? child.snapshot.url[child.snapshot.url.length - 1].path : '';
    return lastUrl.length > 0;
  }

  async updateModalStatus(): Promise<void> {
    if (this.shouldOpenModal && this.details) {
      if (this.closeSubscription) {
        return;
      }
      const modal = this.modalService.open(this.details, {size: 'xl', centered: true});
      this.closeSubscription = modal.dismissed.subscribe(async () => {
        await this.router.navigate(
          [
            '/districts',
            this.routeParams.districtId,
            'groups',
            this.routeParams.groupId,
            'dashboard',
            'beneficiaries',
            'b',
            this.beneficiaryId
          ],
          {relativeTo: this.route.firstChild}
        );
      });
    } else {
      this.closeSubscription?.unsubscribe();
      this.closeSubscription = undefined;
      this.modalService.dismissAll();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.closeSubscription?.unsubscribe();
  }

  async onFilePressed(): Promise<void> {
    await this.router.navigate(
      [
        '/districts',
        this.routeParams.districtId,
        'groups',
        this.routeParams.groupId,
        'dashboard',
        'beneficiaries',
        'b',
        this.beneficiaryId,
        'file'
      ],
      {relativeTo: this.route}
    );
  }
}
