import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../services/http.service';
import {PlaceTypesService} from '../../services/place-types.service';
import {FormMode} from '../../common/misc/helper';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit {

  FormMode = FormMode;
  form: FormGroup = this.fb.group({
    label: '',
    description: '',
    status: 'WAITING_FOR_APPROVAL',
    id_place_type: null
  });

  placeTypes;

  constructor(public dialogRef: MatDialogRef<AddEventModalComponent>,
              private fb: FormBuilder,
              private httpService: HttpService,
              private placeTypesService: PlaceTypesService,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.placeTypes = this.placeTypesService.placeTypes;
  }

  addNews() {
    const data = this.form.getRawValue();
    this.httpService.post('/events', data).subscribe(res => {
    });
  }
}
