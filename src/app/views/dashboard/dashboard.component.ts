import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'sspirit-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  get user$(): Observable<User | null> {
    return this.auth.user$;
  }

  get fullName$(): Observable<string> {
    return this.user$.pipe(filter(user => !!user), map(user => user.nickname ?? `${user.firstName} ${user.lastName}`));
  }

  constructor(private router: Router, private auth: AuthenticationService, private snackbar: MatSnackBar, private alert: AlertService) {
  }

  ngOnInit(): void {
  }

  async signOut(): Promise<void> {
    try {
      if (!await this.alert.askConfirmation('¿Seguro que quieres cerrar sesión?')) {
        return;
      }
      await this.auth.signOut();
      await this.router.navigate(['/']);
    } catch (e) {
      this.snackbar.open('Error while signing out');
      throw e;
    }
  }
}
