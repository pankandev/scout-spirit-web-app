import {Component, OnInit} from '@angular/core';
import {GroupsService} from '../../services/groups.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {joinKey, splitKey} from '../../utils/key';
import {RouteParamsService} from '../../services/route-params.service';
import {map} from 'rxjs/operators';
import {Group} from '../../models/group.model';

@Component({
  selector: 'sspirit-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.sass']
})
export class GroupSelectComponent implements OnInit {
  availableGroups$: Observable<Group[]>;
  selectedGroupId$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private routeParameters: RouteParamsService,
    private groups: GroupsService,
    private router: Router
  ) {
    this.selectedGroupId$ = this.routeParameters.districtGroupId$.pipe(
      map(params => joinKey(params.districtId, params.groupId))
    );
    this.availableGroups$ = groups.getMyGroups();
  }

  ngOnInit(): void {
  }

  async onGroupSelect(districtGroupId: string): Promise<void> {
    const [district, group] = splitKey(districtGroupId);
    await this.router.navigate(['/districts', district, 'groups', group]);
  }

  joinKey(district: string, code: string): string {
    return joinKey(district, code);
  }
}
