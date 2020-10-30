import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddMarkerModalComponent } from './map/add-marker-modal/add-marker-modal.component';
import {AddUserModalComponent} from '../users/users/add-user-modal/add-user-modal.component';


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
    MatTooltipModule
  ],
  entryComponents: [
    AddMarkerModalComponent
  ]
})
export class MapModule {
}
