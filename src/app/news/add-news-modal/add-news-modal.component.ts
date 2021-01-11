import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormMode} from '../../common/misc/helper';
import {HttpService} from '../../services/http.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {PlaceTypesService} from '../../services/place-types.service';
import {MarkerTypes} from '../../map/map/map.component';
const L = window['L'];
const TOKEN = 'pk.eyJ1IjoiYWthcHJhbmNoaWtvdmEiLCJhIjoiY2tneXRob3lxMG91ODJzb3NlNGt6Z2wxcyJ9.u6IgyPtPQpZhtUQldevAsw';

@Component({
  selector: 'app-add-news-modal',
  templateUrl: './add-news-modal.component.html',
  styleUrls: ['./add-news-modal.component.scss']
})
export class AddNewsModalComponent implements OnInit, AfterViewInit {

  FormMode = FormMode;
  form: FormGroup = this.fb.group({
    label: '',
    description: '',
    status: 'WAITING_FOR_APPROVAL',
    placeTypeId: null
  });

  map;
  placeTypes;
  @ViewChild('map') mapElement: ElementRef;

  markerLayers = {};
  objType = {
    1: MarkerTypes.draw,
    2: MarkerTypes.house,
    3: MarkerTypes.other,
  };
  selectMarker;

  constructor(public dialogRef: MatDialogRef<AddNewsModalComponent>,
              private fb: FormBuilder,
              private httpService: HttpService,
              private placeTypesService: PlaceTypesService,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.placeTypes = this.placeTypesService.placeTypes;
    if (this.data.mode === FormMode.EDIT) {
      this.form = this.fb.group({...this.data.element, placeTypeId: this.data.element.placeType.id});
    }
  }
  ngAfterViewInit() {
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
      countryLabel: 'ru',
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(this.map);
    this.loadMarkers();
  }

  loadMarkers() {
    this.httpService.get('/map-markers').subscribe(res => {
      res.forEach(marker => {
        this.addMarker(this.objType[marker.placeType.id], [marker.lat, marker.lng], marker.id);
      });
      Object.keys(this.markerLayers).forEach(key => {
        this.markerLayers[key].addTo(this.map);
      });
    });
  }


  addNews() {
    const data = this.form.getRawValue();
    data.mapMarkerId = this.selectMarker;
    if (this.data.mode === FormMode.ADD) {
      this.httpService.post('/posts', data).subscribe(res => {
        this.dialogRef.close(true);
      });
    } else {
      this.httpService.put(`/posts/${this.data.element.id}`, data).subscribe(res => {
        this.dialogRef.close(true);
      });
    }
  }


  addMarker(type, coord, id) {
    const marker = L.marker(coord, {
      icon: L.divIcon({
        className: `marker-leaflet ${type}`,
        html: `<div class="icon"></div>`, iconSize: [32, 32]
      })
    });

    marker.on('click', () => {
      this.selectMarker = id;
    });

    if (!this.markerLayers[type]) {
      this.markerLayers[type] = new L.LayerGroup([marker]);
    } else {
      this.markerLayers[type].addLayer(marker);
    }
  }



}
