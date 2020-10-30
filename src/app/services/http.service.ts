import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, ReplaySubject, throwError} from 'rxjs';
import {EventService} from './event.service';
import {environment} from '../../environments/environment';

enum HTTP_METHOD {
  GET,
  POST,
  PATCH,
  PUT,
  DELETE
}


@Injectable()
export class HttpService {

  // tslint:disable-next-line:variable-name
  private _apiUrl: string = environment.httpApiUrl;

  public tokenReceived$ = new ReplaySubject(1);

  constructor(private _http: HttpClient,
              private _eventService: EventService) {

  }


  public get(url: string, params?: { [key: string]: any }, hideSpinner?: boolean, apiV2?: boolean, rtype?: string): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key of Object.keys(params)) {
        if (!!params[key]) {
          httpParams = httpParams.append(key, params[key]);
        }
      }
    }
    return this._request(HTTP_METHOD.GET, url, params, hideSpinner, apiV2, rtype);
  }

  export(url: string, params?: { [key: string]: any }): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-type', 'application/octet-stream')
      .append('Accept', 'application/octet-stream');
    const httpOptions = {headers, params, responseType: 'blob'};
    // @ts-ignore
    return this._http.get(`http://office-api.ads.svc.k8s.devel/api/v1/${url}`, httpOptions);
  }

  public post(url: string, data: any, hideSpinner?: boolean, apiV2?: boolean, rtype?: string): Observable<any> {
    return this._request(HTTP_METHOD.POST, url, data, hideSpinner, apiV2, rtype);
  }


  public patch(url: string, data: any, hideSpinner?: boolean, apiV2?: boolean): Observable<any> {
    return this._request(HTTP_METHOD.PATCH, url, data, hideSpinner, apiV2);
  }


  public put(url: string, data?: any, hideSpinner?: boolean, apiV2?: boolean): Observable<any> {
    return this._request(HTTP_METHOD.PUT, url, data, hideSpinner, apiV2);
  }

  public delete(url: string, params?: { [key: string]: any }, hideSpinner?: boolean, apiV2?: boolean): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key of Object.keys(params)) {
        if (!!params[key]) {
          httpParams = httpParams.append(key, params[key]);
        }
      }
    }
    return this._request(HTTP_METHOD.DELETE, url, params, hideSpinner, apiV2);
  }

  private _request(method: HTTP_METHOD, url: string, data?: any, hideSpinner?: boolean, apiV2?: boolean, rtype?: string) {

    if (!hideSpinner) {
      this._eventService.isLoading$.next(true);
    }
    let response: Observable<Object>;
    const headers = new HttpHeaders();
    let httpOptions: any;
    if (rtype !== 'no-headers') {
      headers
        .append('Cache-control', 'no-store')
        .append('Accept', 'application/json')
        .append('Content-Type', rtype ? rtype : 'application/json');

      httpOptions = {headers, params: {}, responseType: rtype ? rtype as 'json' : 'json'};
    }

    const concatUrl = (apiV2 ? environment.httpApiUrlV2 : this._apiUrl) + url;
    switch (method) {
      case HTTP_METHOD.GET:
        httpOptions.params = data;
        response = this._http.get(concatUrl, httpOptions);
        break;
      case HTTP_METHOD.POST:
        response = this._http.post(concatUrl, data, httpOptions);
        break;
      case HTTP_METHOD.PUT:
        response = this._http.put(concatUrl, data, httpOptions);
        break;
      case HTTP_METHOD.PATCH:
        response = this._http.patch(concatUrl, data, httpOptions);
        break;
      case HTTP_METHOD.DELETE:
        httpOptions.params = data;
        response = this._http.delete(concatUrl, httpOptions);
        break;
      default:
        throw throwError('http method not implemented');
    }

    return response;

  }

}
