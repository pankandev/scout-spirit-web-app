import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, startWith, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteParamsService {
  url$: Observable<void>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.url$ = this.router.events.pipe(
      startWith(new NavigationEnd(-1, route.snapshot.url.join('/'), route.snapshot.url.join('/'))),
      filter(event => event instanceof NavigationEnd),
      map((_) => undefined)
    );
  }

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

  allRoutes(route: ActivatedRoute): Observable<ActivatedRoute[]> {
    return this.url$.pipe(
      map(() => {
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
      }),
    );
  }

  getAggregatedData(route: ActivatedRoute): Observable<object> {
    return this.allRoutes(route)
      .pipe(
        switchMap(routes => {
          return combineLatest(routes.map(r => r.data));
        }),
        map(data => Object.assign({}, ...data))
      );
  }

  getAggregatedParams<T extends object>(route: ActivatedRoute): Observable<T> {
    return this.allRoutes(route)
      .pipe(
        switchMap(routes => {
          return combineLatest(routes.map(r => r.params));
        }),
        map(data => Object.assign({}, ...data))
      );
  }

  getAggregatedParamsSnap<T extends object>(route: ActivatedRoute): T {
    return this.allRoutesSnap(route).reduce((prev: any, r) => ({...prev, ...r.snapshot.params}), {}) as T;
  }
}
