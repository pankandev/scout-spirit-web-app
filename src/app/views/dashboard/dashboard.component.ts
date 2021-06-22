import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Observable, of} from 'rxjs';
import {User} from '../../models/user.model';
import {filter, map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AlertService} from '../../services/alert.service';
import {RouteParamsService} from '../../services/route-params.service';
import {AreaValue} from '../../models/area-value';
import {GroupsService, GroupStats} from '../../services/groups.service';
import {GroupGuard} from '../../guards/group.guard';

@Component({
  selector: 'sspirit-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  routePath$: Observable<string | null>;
  areaLogs$: Observable<AreaValue<number>>;
  loading$: Observable<boolean>;
  stats$: Observable<GroupStats | null>;

  get user$(): Observable<User | null> {
    return this.auth.user$;
  }

  fullName$ = this.user$
    .pipe(
      filter(user => !!user),
      map(user => user ? (user.nickname ?? `${user.firstName} ${user.lastName}`) : 'Cargando...')
    );

  constructor(
    private router: Router,
    private groupGuard: GroupGuard,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private routeParams: RouteParamsService,
    private snackbar: MatSnackBar,
    private alert: AlertService,
    private groups: GroupsService
  ) {
    this.loading$ = groupGuard.loading$;
    this.routePath$ = this.routeParams.allRoutes$.pipe(
      switchMap<ActivatedRoute[], Observable<UrlSegment[] | null>>(routes => {
        return routes.length > 0 ? routes[routes.length - 1].url : of(null);
      }),
      map(url => {
        return !url ? null : url.length > 0 ? url[url.length - 1].path : null;
      })
    );

    this.stats$ = groups.groupStats$;

    this.areaLogs$ = this.routeParams.districtGroupId$.pipe(
      switchMap(params => groups.countAreasActivity(
        params.districtId, params.groupId, true, false
      ))
    );
  }

  ngOnInit(): void {
  }

  async signOut(): Promise<void> {
    try {
      if (!await this.alert.askConfirmation('¿Seguro que quieres cerrar sesión?')) {
        return;
      }
      await this.auth.signOut();
      await this.router.navigate(['/']);
    } catch (e) {
      this.snackbar.open('Error while signing out');
      throw e;
    }
  }
}
