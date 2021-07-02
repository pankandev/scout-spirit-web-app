import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {GroupsService, GroupStats, ObjectiveKey} from '../../../services/groups.service';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {RouteParamsService} from '../../../services/route-params.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DevelopmentArea} from '../../../models/area-value';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sspirit-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private routeParams: RouteParamsService,
    private route: ActivatedRoute,
    private router: Router,
    private service: GroupsService,
    private modalService: NgbModal
  ) {
    this.stats$ = this.service.groupStats$;
    this.openedModal$ = this.routeParams.url$.pipe(
      map(() => {
        return !!this.route.firstChild;
      }),
      distinctUntilChanged()
    );
    this.nBeneficiaries$ = this.stats$.pipe(map(stats => Object.keys(stats?.progressLogs ?? {}).length));
    this.logCount$ = service.logHistory$.pipe(
      map(history => ({
        'Objetivos completados': this.countHistory(history.COMPLETED),
        'Avances registrados': this.countHistory(history.PROGRESS),
        'Total de actividad': this.countHistory(this.mergeHistories(history.PROGRESS, history.COMPLETED)),
      }))
    );
    this.ranking$ = service.ranking$;
  }

  get groupId(): string {
    return this.routeParams.groupId;
  }

  get districtId(): string {
    return this.routeParams.districtId;
  }

  get shouldOpenModal(): boolean {
    const child = this.route.firstChild;
    if (!child) {
      return false;
    }
    const lastUrl = child.snapshot.url.length > 0 ? child.snapshot.url[child.snapshot.url.length - 1].path : '';
    return lastUrl.length > 0;
  }
  @ViewChild('details') details?: ElementRef;

  stats$: Observable<GroupStats | null>;
  nBeneficiaries$: Observable<number>;
  logCount$: Observable<Record<string, Record<number, number>>>;
  ranking$: Observable<DevelopmentArea[]>;
  subscription = new Subscription();

  openedModal$: Observable<boolean>;

  closeSubscription?: Subscription;

  mergeHistories(...histories: Record<number, ObjectiveKey[]>[]): Record<number, ObjectiveKey[]> {
    const merged: Record<number, ObjectiveKey[]> = {};

    let history: Record<number, ObjectiveKey[]>;
    for (history of histories) {
      let timestamp: string | number;
      for (timestamp in history) {
        if (!history.hasOwnProperty(timestamp)) {
          continue;
        }
        timestamp = parseInt(timestamp, 10);
        const prev: ObjectiveKey[] = merged[timestamp] ?? [];
        merged[timestamp] = [...prev, ...history[timestamp]];
      }
    }
    return merged;
  }

  countHistory(history: Record<number, ObjectiveKey[]>): Record<number, number> {
    const entries = Object.entries(history);

    const count: Record<string, number> = {};
    entries.forEach(entry => {
      count[entry[0]] = entry[1].length;
    });
    return count;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.routeParams.url$.subscribe(() => this.updateModalStatus())
    );
  }

  ngAfterViewInit(): void {
    this.updateModalStatus();
  }

  async updateModalStatus(): Promise<void> {
    if (this.shouldOpenModal && this.details) {
      if (this.closeSubscription) {
        return;
      }
      const modal = this.modalService.open(this.details, {windowClass: 'modal-view', centered: true});
      this.closeSubscription = modal.dismissed.subscribe(async () => {
        await this.router.navigate(
          ['/districts', this.districtId, 'groups', this.groupId, 'dashboard', 'summary'],
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
}
