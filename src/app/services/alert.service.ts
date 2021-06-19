import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackbar: MatSnackBar) { }

  async askConfirmation(message: string): Promise<boolean> {
    const response = await Swal.fire<boolean>({
      title: message,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });
    return response.value ?? false;
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Cerrar');
  }
}
