import {Component, OnInit} from '@angular/core';
import {GroupsService} from '../../services/groups.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Group} from '../../models/group.model';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'sspirit-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.sass']
})
export class InviteComponent implements OnInit {
  group$: Observable<Group>;
  loading = false;

  constructor(private groupsService: GroupsService, private router: Router, private route: ActivatedRoute, private snackbar: MatSnackBar) {
    this.group$ = this.route.params
      .pipe(
        switchMap(params => this.groupsService.getGroup(params.districtId, params.groupId))
      );
  }

  get districtId(): string {
    return this.route.snapshot.params.districtId;
  }

  get groupId(): string {
    return this.route.snapshot.params.groupId;
  }

  get code(): string {
    return this.route.snapshot.queryParams.code;
  }

  ngOnInit(): void {
  }

  async acceptInvitation(): Promise<void> {
    this.loading = true;
    if (await this.groupsService.joinAsScouter(this.districtId, this.groupId, this.code)) {
      await this.router.navigate(['../dashboard'], {relativeTo: this.route});
    } else {
      this.snackbar.open('El enlace de invitación no es válido', 'Cerrar');
    }
    this.loading = false;
  }
}
