import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<UrlTree | boolean> {
    await this.auth.updateCurrentUser();
    if (!this.auth.snapUser) {
      return true;
    }
    return await this.router.navigate(['/no-group']);
  }
}
