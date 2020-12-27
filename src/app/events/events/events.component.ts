import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {MatDialog} from '@angular/material/dialog';
import {AddNewsModalComponent} from '../../news/add-news-modal/add-news-modal.component';
import {FormMode} from '../../common/misc/helper';
import {AddEventModalComponent} from '../add-event-modal/add-event-modal.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  FormMode = FormMode;
  events;
  canEdit;

  constructor(private httpService: HttpService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
    this.canEdit = this.authService.canEdit;
  }

  loadData() {
    this.httpService.get('/events').subscribe(res => {
      this.events = res;
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

  deleteEvent(id: number) {
    this.httpService.delete(`/posts/${id}`).subscribe(res => {
      this.loadData();
    });
  }

}
