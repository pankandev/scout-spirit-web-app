import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {getControlOrThrow} from '../../utils/form';
import {Router} from '@angular/router';

@Component({
  selector: 'sspirit-signup-panel',
  templateUrl: './signup-panel.component.html',
  styleUrls: ['./signup-panel.component.sass']
})
export class SignupPanelComponent implements OnInit {
  loading = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    nickname: new FormControl(''),
  });

  constructor(private auth: AuthenticationService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  get email(): FormControl {
    return getControlOrThrow('email', this.form);
  }

  get password(): FormControl {
    return getControlOrThrow('password', this.form);
  }

  get name(): FormControl {
    return getControlOrThrow('name', this.form);
  }

  get middleName(): FormControl {
    return getControlOrThrow('middleName', this.form);
  }

  get lastName(): FormControl {
    return getControlOrThrow('lastName', this.form);
  }

  get nickname(): FormControl {
    return getControlOrThrow('nickname', this.form);
  }

  async signUp(): Promise<void> {
    this.loading = true;
    this.form.disable();
    const email = this.email.value;
    try {
      await this.auth.signUp(
        email,
        this.password.value,
        this.nickname.value.length > 0 ? this.nickname.value : null,
        this.name.value,
        this.middleName.value.length > 0 ? this.middleName.value : null,
        this.lastName.value
      );
      await this.router.navigate(['/confirm'], {queryParams: {email}});
    } catch (e) {
      switch (e.code) {
        case 'UsernameExistsException':
          this.snackBar.open('Ya existe una cuenta con este correo electrónico', 'Cerrar');
          break;
        default:
          this.snackBar.open('Algo pasó. Intente de nuevo más tarde', 'Cerrar');
          break;
      }
    } finally {
      this.loading = false;
      this.form.enable();
    }
  }
}
