import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class alertService {
  constructor(private readonly toastr: ToastrService) {}

  showWarning(msg: string) {
    this.toastr.warning(msg, '', {
      timeOut: 4500,
      positionClass: 'toast-bottom-center',
    });
  }
  showWarningFull(msg: string) {
    this.toastr.warning(msg, '', {
      timeOut: 4500,
      positionClass: 'toast-bottom-full-width',
    });
  }

  showError(msg: string) {
    this.toastr.error(msg, '', {
      timeOut: 4500,
      positionClass: 'toast-bottom-center',
    });
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, '', {
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
    });
  }

  showInfo(msg: string) {
    this.toastr.info(msg, '', {
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
    });
  }

  show(msg: string) {
    this.toastr.show(msg, '', {
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
    });
  }
}
