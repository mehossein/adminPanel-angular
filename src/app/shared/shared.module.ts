import { NgModule } from '@angular/core';
import { DialogsModule } from './dialogs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material/material.module';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

const MODULES = [
  CommonModule,
  MaterialModule,
  DialogsModule,
  NgPersianDatepickerModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
