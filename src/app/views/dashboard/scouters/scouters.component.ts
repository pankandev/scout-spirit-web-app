import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {ListItem} from '../../../widgets/scrollable-list/scrollable-list.component';
import {AppError} from '../../../errors/app.error';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {Unit} from '../../../models/area-value';
import {ActivatedRoute} from '@angular/router';
import {GroupsService} from '../../../services/groups.service';
import {Group, ScouterRoleType} from '../../../models/group.model';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'sspirit-scouters',
  templateUrl: './scouters.component.html',
  styleUrls: ['./scouters.component.sass']
})
export class ScoutersComponent implements OnInit {
  items$: Observable<ListItem[]>;
  inviteUrl$: Observable<string>;
  group$: Observable<Group>;

  getRoleIndex(role: ScouterRoleType): number {
    switch (role) {
      case 'creator':
        return 0;
      case 'scouter':
        return 1;
      default:
        return 999;
    }
  }

  constructor(private route: ActivatedRoute, private service: GroupsService, private alert: AlertService) {
    const groupRoute = this.route.parent?.parent;
    const districtRoute = this.route.parent?.parent?.parent;
    const unitRoute = this.route;
    if (!districtRoute) {
      throw new AppError('District route not found');
    }
    if (!groupRoute) {
      throw new AppError('Group route not found');
    }
    const ids$ = combineLatest([districtRoute.params, groupRoute.params, unitRoute.params])
      .pipe(map(([d, g, u]) => ({
        districtId: d.districtId as string,
        groupId: g.groupId as string,
        unit: u.unit && u.unit === 'scouts' || u.unit === 'guides' ? u.unit as Unit : undefined
      })));
    this.group$ = ids$.pipe(
      switchMap(ids => this.service.getGroup(ids.districtId, ids.groupId)),
      shareReplay({refCount: true})
    );
    this.inviteUrl$ = this.group$.pipe(
      map(group => {
        const location = window.location;
        return `${location.origin}/districts/${group.district}/groups/${group.code}/invite?code=${group.scouters_code}`;
      })
    );
    this.items$ = this.group$.pipe(
      map(group => {
        return Object.entries(group.scouters)
          .sort(([_, a], [__, b]) => this.getRoleIndex(a.role) - this.getRoleIndex(b.role))
          .map(([scouterId, value]) => {
            return {
              id: scouterId,
              title: value.name,
              subtitle: this.service.getScouterRoleName(value.role)
            };
          });
      })
    );
  }

  ngOnInit(): void {
  }

  onClipboardResult(result: boolean): void {
    this.alert.showSnackbar(result ? 'Enlace copiado en portapapeles' : 'Algo ocurrió copiando enlace');
  }
}
