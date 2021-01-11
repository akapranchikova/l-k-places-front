import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddUserModalComponent} from '../../users/users/add-user-modal/add-user-modal.component';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-logs-tabel',
  templateUrl: './logs-tabel.component.html',
  styleUrls: ['./logs-tabel.component.scss']
})
export class LogsTabelComponent implements OnInit {

  dataSource;
  displayedColumns = ['login', 'faculty', 'user', 'rating'];

  constructor(private dialog: MatDialog, private http: HttpService) { }

  ngOnInit(): void {
    this.http.get('/audit').subscribe(res => {
      this.dataSource = res;
    });
  }

}
