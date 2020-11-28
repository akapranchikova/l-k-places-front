import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormMode} from '../../common/misc/helper';
import {HttpService} from '../../services/http.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {PlaceTypesService} from '../../services/place-types.service';

@Component({
  selector: 'app-add-news-modal',
  templateUrl: './add-news-modal.component.html',
  styleUrls: ['./add-news-modal.component.scss']
})
export class AddNewsModalComponent implements OnInit {

  FormMode = FormMode;
  form: FormGroup = this.fb.group({
    label: '',
    description: '',
    status: 'WAITING_FOR_APPROVAL',
    id_place_type: null
  });

  placeTypes;

  constructor(public dialogRef: MatDialogRef<AddNewsModalComponent>,
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
    this.httpService.post('/posts', data).subscribe(res => {
    });
  }


}
