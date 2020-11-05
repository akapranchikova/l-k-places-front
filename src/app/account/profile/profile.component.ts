import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUserObservable().subscribe(res => {
      this.user = res;
    });
  }

}
