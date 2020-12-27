import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddUserModalComponent} from '../../users/users/add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-logs-tabel',
  templateUrl: './logs-tabel.component.html',
  styleUrls: ['./logs-tabel.component.scss']
})
export class LogsTabelComponent implements OnInit {

  dataSource = [
    {
      login: 'user',
      faculty: 'AMM',
      user: 'User 1',
      rating: 1200
    },
    {
      login: 'user',
      faculty: 'AMM',
      user: 'User 1',
      rating: 1200
    },
  ];
  displayedColumns = ['login', 'faculty', 'user', 'rating'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
