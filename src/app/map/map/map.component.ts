import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddMarkerModalComponent} from './add-marker-modal/add-marker-modal.component';
import {FormMode} from '../../common/misc/helper';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  FormMode = FormMode;
  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
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

}
