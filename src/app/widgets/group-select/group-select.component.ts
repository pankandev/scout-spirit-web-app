import {Component, OnInit} from '@angular/core';
import {DistrictGroupId, GroupsService} from '../../services/groups.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {joinKey} from '../../utils/key';
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

  constructor(private route: ActivatedRoute, private routeParameters: RouteParamsService, private groups: GroupsService) {
    this.selectedGroupId$ = this.routeParameters.getAggregatedParams<DistrictGroupId>(route).pipe(
      map(params => joinKey(params.districtId, params.groupId))
    );
    this.availableGroups$ = groups.getMyGroups();
  }

  ngOnInit(): void {
  }

  onGroupSelect(_: string): void {
    // const [district, group] = splitKey(districtGroup);
  }

  joinKey(district: string, code: string): string {
    return joinKey(district, code);
  }
}
