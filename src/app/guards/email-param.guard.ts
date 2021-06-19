import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmailParamGuard implements CanActivate {
  constructor(private router: Router) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    if (!!route.queryParams.email) {
      return true;
    }
    await this.router.navigate(['/']);
    return false;
  }
}
