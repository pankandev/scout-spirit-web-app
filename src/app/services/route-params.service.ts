import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, startWith} from 'rxjs/operators';

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

  allRoutes(route: ActivatedRoute): Observable<ActivatedRoute[]> {
    return this.url$.pipe(
      map(() => {
        const allRouteData: ActivatedRoute[] = [];

        let child: ActivatedRoute | null = route;
        do {
          allRouteData.push(child);
          child = child.firstChild;
        } while (child);
        return allRouteData;
      }),
    );
  }
}
