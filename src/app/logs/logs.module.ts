import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsTabelComponent } from './logs-tabel/logs-tabel.component';
import {Router, RouterModule, Routes} from '@angular/router';
import {MatTableModule} from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: LogsTabelComponent
  }
];


@NgModule({
  declarations: [LogsTabelComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule
  ]
})
export class LogsModule { }
