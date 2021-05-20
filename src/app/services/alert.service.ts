import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  async askConfirmation(message: string): Promise<boolean> {
    const response = await Swal.fire<boolean>({
      title: message,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });
    return response.value ?? false;
  }
}
