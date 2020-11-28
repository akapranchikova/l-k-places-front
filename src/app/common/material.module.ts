import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {SelectComponent} from './select/select.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';

const materialModules = [
  MatDialogModule,
  MatIconModule,
];

@NgModule({
  declarations: [SelectComponent],
  imports: [
    ...materialModules,
    MatTooltipModule,
    CommonModule,
  ], exports: [
    SelectComponent,
    ...materialModules
  ]
})
export class MaterialModule { }
