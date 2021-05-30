import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NoGroupGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    await this.auth.updateCurrentUser();
    const user = await this.auth.snapUser;

    if (user && user.groups.length > 0) {
      const group = user.groups[0];
      return this.router.createUrlTree(['/districts', group[0], 'groups', group[1]]);
    }
    return true;
  }
}
