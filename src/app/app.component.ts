import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {GroupGuard} from './guards/group.guard';

@Component({
  selector: 'sspirit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'scout-personal-progression-webapp';

  constructor(private guard: GroupGuard) {
  }

  formFields = [
    {
      type: 'email',
      label: 'E-mail',
      placeholder: 'mail@mail.com',
      required: true,
    },
    {
      type: 'name',
      label: 'Nombre',
      placeholder: 'Juan',
      required: true,
    },
    {
      type: 'middle_name',
      label: 'Segundo Nombre',
      placeholder: '...',
      required: false,
    },
    {
      type: 'family_name',
      label: 'Apellido',
      placeholder: 'Pérez',
      required: true,
    },
    {
      type: 'password',
      label: 'Contraseña',
      placeholder: 'Contraseña',
      required: true,
    },
  ];
  loading$: Observable<boolean> = this.guard.loading$;
}
