import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private authService: AuthService, private router: Router) { }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const user = await this.authService.getUserObservable().toPromise()
    if (user) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
