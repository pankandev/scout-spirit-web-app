import {FormControl, FormGroup} from '@angular/forms';
import {AppError} from '../errors/app.error';

export function getControlOrThrow(path: string, form: FormGroup): FormControl {
  const control = form.get(path);
  if (!control)
    throw new AppError();
  return control as FormControl;
}
