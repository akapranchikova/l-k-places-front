import {Component, OnInit} from '@angular/core';
import {AddMarkerModalComponent} from '../../map/map/add-marker-modal/add-marker-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {FormMode} from '../../common/misc/helper';
import {AddNewsModalComponent} from '../add-news-modal/add-news-modal.component';
import {HttpService} from '../../services/http.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  FormMode = FormMode;
  setNews;
  canEdit;
  user;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.loadNews();
    this.canEdit = this.authService.canEdit;
    this.authService.getUserObservable().subscribe(res => this.user = res);
  }

  loadNews() {
    this.httpService.get('/posts').subscribe(res => {
      this.setNews = res;
    });
  }

  openAddNewsModal(mode: FormMode, element?) {
    this.dialog.open(AddNewsModalComponent, {
      width: '600px',
      data: {
        mode,
        element
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.loadNews();
      }
    });
  }

  delete(id) {
    this.httpService.delete('/posts/' + id).subscribe(res => {
      this.loadNews();
    });
  }

}
