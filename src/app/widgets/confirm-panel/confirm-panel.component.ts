import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {getControlOrThrow} from '../../utils/form';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'sspirit-confirm-panel',
  templateUrl: './confirm-panel.component.html',
  styleUrls: ['./confirm-panel.component.sass']
})
export class ConfirmPanelComponent implements OnInit {
  loading = false;
  form = new FormGroup({
    code: new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService, private snackbar: MatSnackBar) {
  }

  get email(): string {
    return this.route.snapshot.queryParams.email;
  }

  get code(): FormControl {
    return getControlOrThrow('code', this.form);
  }

  ngOnInit(): void {
  }

  async confirm(): Promise<void> {
    this.loading = true;
    try {
      const answer = await this.auth.confirm(this.email, this.code.value);
      if (answer) {
        this.snackbar.open(`Cuenta ${this.email} confirmada`);
        await this.router.navigate(['/no-group']);
      } else {
        this.snackbar.open('Código incorrecto', 'Cerrar');
      }
    } catch (e) {
      switch (e.code) {
        case 'NotAuthorizedException':
          this.snackbar.open('Su cuenta ya está confirmada', 'Cerrar');
          break;
        default:
          this.snackbar.open('Algo pasó. Por favor intente más adelante', 'Cerrar');
      }
    } finally {
      this.loading = false;
    }
  }

  async resendConfirmationCode(): Promise<void> {
    this.loading = true;
    try {
      if (await this.auth.sendConfirmationCode(this.email)) {
        this.snackbar.open(`Código de confirmación enviado a ${this.email}`);
      } else {
        this.snackbar.open(`Límite de códigos enviados a ${this.email}. Por favor intente más tarde`);
      }
    } catch (e) {
    } finally {
      this.loading = false;
    }
  }
}
