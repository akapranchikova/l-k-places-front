import { Component, OnInit } from '@angular/core';
import {AddMarkerModalComponent} from '../../map/map/add-marker-modal/add-marker-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {FormMode} from '../../common/misc/helper';
import {AddNewsModalComponent} from '../add-news-modal/add-news-modal.component';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  FormMode = FormMode;
  constructor(private dialog: MatDialog, private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.get('/posts').subscribe(res => {
      console.log(res);
    });
  }

  openAddNewsModal(mode: FormMode, element?) {
    this.dialog.open(AddNewsModalComponent, {
      width: '600px',
      data: {
        mode,
        element
      }
    });
  }

}
