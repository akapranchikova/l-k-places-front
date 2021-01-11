import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddUserModalComponent} from './add-user-modal/add-user-modal.component';
import {FormMode} from '../../common/misc/helper';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource;
  displayedColumns = ['login', 'faculty', 'user', 'actions'];
  FormMode = FormMode;

  constructor(private dialog: MatDialog, private httpService: HttpService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.httpService.get('/users').subscribe(res => {
      this.dataSource = res;
    });
  }

  openUserModal(mode: FormMode, element?) {
    this.dialog.open(AddUserModalComponent, {
      width: '400px',
      data: {
        mode,
        element
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.loadUsers();
      }
    });
  }
}
