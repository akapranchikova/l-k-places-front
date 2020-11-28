import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {MatDialog} from '@angular/material/dialog';
import {AddNewsModalComponent} from '../../news/add-news-modal/add-news-modal.component';
import {FormMode} from '../../common/misc/helper';
import {AddEventModalComponent} from '../add-event-modal/add-event-modal.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private httpService: HttpService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.httpService.get('/events').subscribe(res => {
      console.log(res)
    });
  }

  openAddNewsModal(mode: FormMode, element?) {
    this.dialog.open(AddEventModalComponent, {
      width: '600px',
      data: {
        mode,
        element
      }
    });
  }

}
