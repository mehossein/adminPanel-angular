import { Component, Inject } from '@angular/core';
import { DialogData } from '../../models/dialog-data.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-insertEditDialog',
  templateUrl: './insertEditDialog.component.html',
  styleUrls: ['./insertEditDialog.component.scss'],
})
export class InsertEditDialogComponent {
  constructor(
    private readonly _FB: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<InsertEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  Form = this._FB.group({
    userName: ['', [Validators.required]],
    berthDate: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
    userIsActive: ['', [Validators.required]],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
  });

  onSubmit() {
    if (typeof this.data.submitFn == 'function') {
      this.data.userData = this.Form.value;
      this.data.submitFn();
    }
  }
  onCancel() {
    if (typeof this.data.cancelFn == 'function') this.data.cancelFn();
  }
}
