import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceTypesService {

  placeTypesData;

  constructor(private http: HttpClient) {
  }

  get placeTypes() {
    return this.placeTypesData;
  }

  get() {
    return this.http.get('http://lkplaces-env.eba-kgyd2exv.eu-central-1.elasticbeanstalk.com:80/place-types').pipe(map(res => {
      this.placeTypesData = res;
      return res;
    }));
  }
}
