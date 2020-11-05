import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token;
  user;
  userSub = new Subject();

  constructor(private http: HttpClient) {
  }

  get getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  getUser() {
    return this.user;
  }

  getUserObservable() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
    if (this.user) {
      return of(this.user);
    } else {
      return this.userSub;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
    this.token = null;
    this.userSub.next(null);
  }

  saveToken(token) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  saveUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.userSub.next(user);
  }

  signIn(data) {
    return this.http.post('/users/sign-in', data).pipe(map(res => {
      this.saveUser(res);
      // @ts-ignore
      this.saveToken(res.token);
      return true;
    }));
  }
}
