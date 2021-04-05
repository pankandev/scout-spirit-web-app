import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'scout-personal-progression-webapp';

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
}
