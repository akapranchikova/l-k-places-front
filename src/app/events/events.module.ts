import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../common/material.module';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  }
]

@NgModule({
  declarations: [EventsComponent, AddEventModalComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class EventsModule { }
