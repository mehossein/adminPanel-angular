import { Component, Inject } from '@angular/core';
import { DialogData } from '../../models/dialog-data.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'csr-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public onSubmit() {
    if (typeof this.data.submitFn == 'function') this.data.submitFn();
  }
  public onCancel() {
    if (typeof this.data.cancelFn == 'function') this.data.cancelFn();
  }
}
