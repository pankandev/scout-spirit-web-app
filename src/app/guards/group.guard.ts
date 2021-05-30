import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {GroupsService} from '../services/groups.service';
import {AuthenticationService} from '../services/authentication.service';
import {Group} from '../models/group.model';
import {BehaviorSubject} from 'rxjs';
import {AlertService} from '../services/alert.service';
import {AppError} from '../errors/app.error';

@Injectable({
  providedIn: 'root'
})
export class GroupGuard implements CanActivate {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private router: Router,
              private auth: AuthenticationService,
              private group: GroupsService,
              private alertService: AlertService) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    this.loadingSubject.next(true);

    const districtId = route.parent?.parent?.params.districtId;
    const groupId = route.parent?.params.groupId;
    const userId = this.auth.snapUser?.id;

    if (!districtId || !groupId || !userId) {
      throw new AppError('District, group or userId not found');
    }

    let group: Group | null = null;
    try {
      group = await this.group.getGroup(districtId, groupId);
    } catch (e) {
      if (e.statusCode === 404) {
        group = null;
      } else {
        throw e;
      }
    }

    this.loadingSubject.next(false);
    if (group && Object.keys(group.scouters).indexOf(userId) >= 0) {
      return true;
    } else if (!group) {
      this.alertService.showSnackbar('Grupo no encontrado');
      return this.router.createUrlTree(['/not-found']);
    } else {
      this.alertService.showSnackbar('No tienes acceso a este grupo');
      return this.router.createUrlTree(['/no-group']);
    }
  }
}
