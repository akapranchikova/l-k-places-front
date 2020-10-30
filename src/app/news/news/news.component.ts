import { Component, OnInit } from '@angular/core';
import {AddMarkerModalComponent} from '../../map/map/add-marker-modal/add-marker-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {FormMode} from '../../common/misc/helper';
import {AddNewsModalComponent} from '../add-news-modal/add-news-modal.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  FormMode = FormMode;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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
