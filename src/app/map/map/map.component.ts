import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddMarkerModalComponent} from './add-marker-modal/add-marker-modal.component';
import {FormMode} from '../../common/misc/helper';
import 'leaflet';

const L = window['L'];
const TOKEN = 'pk.eyJ1IjoiYWthcHJhbmNoaWtvdmEiLCJhIjoiY2tneXRob3lxMG91ODJzb3NlNGt6Z2wxcyJ9.u6IgyPtPQpZhtUQldevAsw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  FormMode = FormMode;
  map;
  markerLayers = {};
  @ViewChild('map') mapElement: ElementRef;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.mapElement.nativeElement.style.height = `300px`;
    this.map = L.map(this.mapElement.nativeElement, {
      center: [51.505, -0.09],
      zoom: 6,
      // layers: layers,
      zoomDelta: 0.25,
      zoomSnap: 0,
    });
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${TOKEN}`, {
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(this.map);

    this.addMarker('draw', [51.505, -0.09]);
    this.addMarker('draw', [51.505, -1.09]);
    this.addMarker('house', [51.505, -2.09]);
    this.addMarker('other', [51.505, -3.09]);
    Object.keys(this.markerLayers).forEach(key => {
      this.markerLayers[key].addTo(this.map);
    });
  }

  openAddMarkerModal(mode: FormMode, element?) {
    this.dialog.open(AddMarkerModalComponent, {
      width: '400px',
      data: {
        mode,
        element
      }
    });
  }

  addMarker(type, coord) {
    const marker = L.marker(coord, {icon: L.divIcon({className: `marker-leaflet ${type}`, html: `<div class="${type} icon"></div>`, iconSize: [32, 32]})});
    if (!this.markerLayers[type]) {
      this.markerLayers[type] = new L.LayerGroup([marker]);
    } else {
      this.markerLayers[type].addLayer(marker);
    }
  }

}
