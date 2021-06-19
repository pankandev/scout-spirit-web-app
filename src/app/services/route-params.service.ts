import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter, map, startWith, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteParamsService {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  public readonly url$: Observable<void> = this.router.events.pipe(
    startWith(new NavigationEnd(-1, this.route.snapshot.url.join('/'), this.route.snapshot.url.join('/'))),
    filter(event => event instanceof NavigationEnd),
    map((_) => undefined)
  );

  allRoutes$: Observable<ActivatedRoute[]> = this.url$.pipe(
    map(() => {
      const allRouteData: ActivatedRoute[] = [];

      let child: ActivatedRoute | null = this.route;
      while (child?.parent) {
        child = child.parent;
      }

      do {
        allRouteData.push(child);
        child = child.firstChild;
      } while (child);

      return allRouteData;
    })
  );

  public readonly aggregatedParams$ = this.allRoutes$
    .pipe(
      switchMap(routes => {
        return combineLatest(routes.map(r => r.params));
      }),
      map(data => Object.assign({}, ...data))
    );

  public readonly districtId$ = this.aggregatedParams$.pipe(
    map(params => params.districtId),
    distinctUntilChanged()
  );
  public readonly groupId$ = this.aggregatedParams$.pipe(
    map(params => params.groupId),
    distinctUntilChanged()
  );
  public readonly beneficiaryId$ = this.aggregatedParams$.pipe(
    map(params => params.userId as string),
    distinctUntilChanged()
  );

  public districtGroupId$ = combineLatest([this.districtId$, this.groupId$])
    .pipe(map(([districtId, groupId]) => ({districtId, groupId})));


  allRoutesSnap(route: ActivatedRoute): ActivatedRoute[] {
    const allRouteData: ActivatedRoute[] = [];

    let child: ActivatedRoute | null = route;
    while (child?.parent) {
      child = child.parent;
    }

    do {
      allRouteData.push(child);
      child = child.firstChild;
    } while (child);

    return allRouteData;
  }

  get aggregatedParamsSnap(): any {
    return this.allRoutesSnap(this.route).reduce((prev: any, r) => ({...prev, ...r.snapshot.params}), {});
  }

  get districtId(): string {
    return this.aggregatedParamsSnap.districtId;
  }

  get groupId(): string {
    return this.aggregatedParamsSnap.groupId;
  }

  get beneficiaryId(): string {
    return this.aggregatedParamsSnap.userId;
  }
}
