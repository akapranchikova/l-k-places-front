import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormMode} from '../../../common/misc/helper';

@Component({
  selector: 'app-add-marker-modal',
  templateUrl: './add-marker-modal.component.html',
  styleUrls: ['./add-marker-modal.component.scss']
})
export class AddMarkerModalComponent implements OnInit {

  FormMode = FormMode;

  constructor(public dialogRef: MatDialogRef<AddMarkerModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
