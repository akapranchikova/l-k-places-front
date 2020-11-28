import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddMarkerModalComponent } from './map/add-marker-modal/add-marker-modal.component';
import {AddUserModalComponent} from '../users/users/add-user-modal/add-user-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../common/material.module';


const routes: Routes = [
  {
    path: '',
    component: MapComponent
  }
];

@NgModule({
  declarations: [MapComponent, AddMarkerModalComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [
    AddMarkerModalComponent
  ]
})
export class MapModule {
}
