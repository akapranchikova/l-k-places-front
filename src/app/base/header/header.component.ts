import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SignInComponent} from '../sign-in/sign-in.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user;

  constructor(private modalDialog: MatDialog,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserObservable().subscribe(res => {
      this.user = res;
    });
  }

  openSignIn() {
    this.modalDialog.open(SignInComponent, {
      width: '370px',
      autoFocus: false,
    }).afterClosed().subscribe(res => {
    });
  }

  logout() {
    this.authService.logout();
    location.href = '';
  }

}
