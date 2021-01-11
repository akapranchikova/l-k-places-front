import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import 'leaflet';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute} from '@angular/router';

const L = window['L'];

const TOKEN = 'pk.eyJ1IjoiYWthcHJhbmNoaWtvdmEiLCJhIjoiY2tneXRob3lxMG91ODJzb3NlNGt6Z2wxcyJ9.u6IgyPtPQpZhtUQldevAsw';

enum MarkerTypes {
  draw = 'draw', house = 'house', other = 'other'
}

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, AfterViewInit {

  map;
  news;
  newsId;
  @ViewChild('map') mapElement: ElementRef;


  constructor(private http: HttpService, private router: ActivatedRoute) {
    this.newsId = this.router.snapshot.params.id;
  }

  ngOnInit(): void {
    this.http.get(`/posts/${this.newsId}`).subscribe(res => {
      this.news = res;
    });
  }

  ngAfterViewInit() {
    this.map = L.map(this.mapElement.nativeElement, {
      center: [51.505, -0.09],
      zoom: 6,
      zoomDelta: 0.25,
      zoomSnap: 0,
    });
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${TOKEN}`, {
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      countryLabel: 'ru',
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(this.map);

    this.addMarker('draw', [this.news.mapMarker.lat, this.news.mapMarker.lng]);

  }

  addMarker(type, coord) {
    const marker = L.marker(coord, {
      icon: L.divIcon({
        className: `marker-leaflet ${type}`,
        html: `<div class="icon"></div>`, iconSize: [32, 32]
      })
    });
    marker.addTo(this.map);
  }

}
