import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { InsertEditDialogComponent } from './components/insertEditDialog/insertEditDialog.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ConfirmDialogComponent, InsertEditDialogComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class DialogsModule {}
