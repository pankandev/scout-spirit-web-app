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

@Component({
  selector: 'sspirit-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  routePath$: Observable<string | null>;
  areaLogs$: Observable<AreaValue<number>>;

  get user$(): Observable<User | null> {
    return this.auth.user$;
  }

  get fullName$(): Observable<string> {
    return this.user$.pipe(filter(user => !!user), map(user => user.nickname ?? `${user.firstName} ${user.lastName}`));
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private routeParams: RouteParamsService,
    private snackbar: MatSnackBar,
    private alert: AlertService
  ) {
    this.routePath$ = this.routeParams.allRoutes(route).pipe(
      switchMap<ActivatedRoute[], Observable<UrlSegment[] | null>>(routes => routes.length > 0 ? routes[routes.length - 1].url : of(null)),
      map(url => !url ? null : url.length > 0 ? url[url.length - 1].path : null)
    );
    this.areaLogs$ = of<AreaValue<number>>({
      affectivity: 2,
      character: 7,
      corporality: 4,
      creativity: 5,
      sociability: 5,
      spirituality: 8
    });
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
