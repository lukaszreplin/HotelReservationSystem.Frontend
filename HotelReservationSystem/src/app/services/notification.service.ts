import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService) { }

  toastrSettings = {
    closeButton: true,
    timeOut: 4000,
    progressBar: true,
  }

  public Success(msg: string) {
    this.toastrService.success(msg, 'Sukces!', this.toastrSettings);
  }

  public Warning(msg: string) {
    this.toastrService.warning(msg, 'Ostrzeżenie!', this.toastrSettings);
  }

  public Error(msg: string) {
    this.toastrService.error(msg, 'Błąd!', this.toastrSettings);
  }
}
