import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormMode} from '../../../common/misc/helper';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PlaceTypesService} from '../../../services/place-types.service';
import {HttpService} from '../../../services/http.service';
import 'leaflet';

const L = window['L'];
const TOKEN = 'pk.eyJ1IjoiYWthcHJhbmNoaWtvdmEiLCJhIjoiY2tneXRob3lxMG91ODJzb3NlNGt6Z2wxcyJ9.u6IgyPtPQpZhtUQldevAsw';


@Component({
  selector: 'app-add-marker-modal',
  templateUrl: './add-marker-modal.component.html',
  styleUrls: ['./add-marker-modal.component.scss']
})
export class AddMarkerModalComponent implements OnInit, AfterViewInit {

  FormMode = FormMode;
  form: FormGroup = this.fb.group({
    id_place_type: null,
    description: '',
    label: ''
  });
  placeTypes;
  map;
  marker;
  @ViewChild('mapAdd') mapElement: ElementRef;

  constructor(public dialogRef: MatDialogRef<AddMarkerModalComponent>,
              private placeService: PlaceTypesService,
              private httpService: HttpService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.placeTypes = this.placeService.placeTypes;
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
    this.map.on('click', (event) => {
      if (!this.marker) {
        this.marker =  L.marker(event.latlng);
        this.map.addLayer(this.marker);
      } else {
        this.marker.setLatLng(event.latlng);
      }
    });
  }

  save() {
    const data = this.form.getRawValue();
    data.lat = this.marker.getLatLng().lat;
    data.lng = this.marker.getLatLng().lng;
    this.httpService.post('map-marker', data).subscribe(res => res);
  }

  clickOnMap() {}

}
