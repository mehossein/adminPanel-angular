import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../..';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { state } from './../../models/dialog-data.interface';
import { SharedService } from './../../../services/shared.service';
import { City, DialogData } from '../../models/dialog-data.interface';
import { alertService } from 'src/app/shared/modules/alert/services/alert.service';
@Component({
  selector: 'app-insertEditDialog',
  templateUrl: './insertEditDialog.component.html',
  styleUrls: ['./insertEditDialog.component.scss'],
})
export class InsertEditDialogComponent implements OnInit {
  province: City[] = [];
  city: state[] = [];
  editMode: boolean = false;
  constructor(
    public dialog: MatDialog,
    private readonly _FB: FormBuilder,
    private readonly _SharedSrv: SharedService,
    private readonly alertService: alertService,
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<InsertEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    if (this.data.userdata) {
      this.editMode = true;
      this.Form.patchValue({
        username: this.data?.userdata.username,
        birthday: this.data?.userdata.birthday,
        gender: this.data?.userdata.gender,
        activity: this.data?.userdata.activity,
        province: this.data?.userdata.province,
        city: this.data?.userdata.city,
      });
      this.alertService.showWarningFull(
        'در حالت ویرایش اطلاعات ، قابلیت نمایش رمز عبور وجود ندارد . شما فقط  می توانید رمز عبور خود را بازنشانی کنید'
      );
    }
    this._SharedSrv.getCities().subscribe((res: City[]) => {
      this.province = res;
      if (this.editMode) this.getStates(this.data?.userdata.province);
    });
  }

  Form = this._FB.group({
    username: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
    activity: [''],
    province: ['', [Validators.required]],
    city: ['', [Validators.required]],
  });

  onSubmit() {
    if (typeof this.data.submitFn == 'function')
      this.data.submitFn(this.Form.value);
  }

  onCancel() {
    if (typeof this.data.cancelFn == 'function') this.data.cancelFn();
  }

  getStates(name: string) {
    let city = this.province.find((item) => item.name == name);
    this._SharedSrv.getStates(city?.id ?? 0).subscribe((res) => {
      this.city = res;
    });
  }

  deleteUserOnEditMode(id: number) {
    // const dialog = this.dialog.open(ConfirmDialogComponent, {
    //   data: {
    //     submitFn: () => {
    //       dialog.close();
    //     },
    //     cancelFn: () => {
    //       dialog.close();
    //     },
    //   },
    // });
    if (typeof this.data.deleteUserFn == 'function') this.data.deleteUserFn(id);
  }
}
