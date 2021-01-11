import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../common/material.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

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
        MatDatepickerModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MaterialModule,
        MatFormFieldModule
    ]
})
export class EventsModule { }
