import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/internal/operators';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {EventService} from './event.service';
import {AuthService} from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private eventService: EventService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent |
      HttpHeaderResponse |
      HttpProgressEvent |
      HttpResponse<any> |
      HttpUserEvent<any> |
      any> {

    return next.handle(this.addAccessTokenToRequest(request))
      .pipe(
        retry(0),
        tap((event) => {
          if (event instanceof HttpResponse) {
            if (!!event.body && !!event.body.code && event.body.code !== 200) {
              const errorMessage = event.url || '';
            }
            this.eventService.isLoading$.next(false);
          }
        }),
        catchError((err: HttpErrorResponse) => this._handleError(err)),
      );
  }

  private _handle401Error() {
    this.httpService.tokenReceived$.error(new Error('not auth!'));
  }

  private _handleError(error: HttpErrorResponse | TypeError) {
    let toastMessage = '';
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401:
          this._handle401Error();
          break;
        case 201:
        case 400:
        case 500:
        case 502:
          break;
        default:
          console.log(error);
      }
      this.eventService.isLoading$.next(false);
    }

    if (!environment.production) {
      if (error instanceof TypeError) {
        toastMessage = error.stack || '';
      }
    }
    return throwError(error);
  }


  private addAccessTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    if (this.authService.getToken) {
      return request.clone({setHeaders: {Authorization: 'Bearer ' + this.authService.getToken}});
    }
    return request;
  }
}
