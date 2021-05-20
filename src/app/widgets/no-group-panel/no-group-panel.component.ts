import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sspirit-no-group-panel',
  templateUrl: './no-group-panel.component.html',
  styleUrls: ['./no-group-panel.component.sass']
})
export class NoGroupPanelComponent implements OnInit {
  user$ = this.auth.user$;

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
