import {Component, OnInit} from '@angular/core';
import {PlaceTypesService} from './services/place-types.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  title = 'city';

  constructor(private placeTypesService: PlaceTypesService) {
  }

  ngOnInit() {
    this.placeTypesService.get().subscribe();
  }
}
