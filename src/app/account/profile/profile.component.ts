import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;
  image;

  constructor(private auth: AuthService, private http: HttpService) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.auth.getUserObservable().subscribe(res => {
      this.user = res;
      this.image = 'data:image/jpeg;base64,' + res.image;
    });
  }

  handleFiles(files) {
    const formDataPoster = new FormData();
    formDataPoster.append('image', files[0], files[0].name);
    this.http.post(`/users/${this.user.id}/update-image`, formDataPoster).subscribe(res => {
      this.user = res;
      this.image = 'data:image/jpeg;base64,' + res.image;
      this.auth.saveUser(res);
    });
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const img = new Image();
    //   img.onload = () => {
    //
    //   };
    //   // @ts-ignore
    //   img.src = e.target['result'];
    // };
    // reader.readAsDataURL(files[0]);
  }

}
