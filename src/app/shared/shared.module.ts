import { NgModule } from '@angular/core';
import { DialogsModule } from './dialogs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material/material.module';

const MODULES = [CommonModule, MaterialModule, DialogsModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
