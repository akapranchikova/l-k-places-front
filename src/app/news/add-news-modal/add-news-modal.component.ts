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
    placeTypeId: null
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
    if (this.data.mode === FormMode.EDIT) {
      this.form = this.fb.group({...this.data.element, placeTypeId: this.data.element.placeType.id});
    }
  }

  addNews() {
    const data = this.form.getRawValue();
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


}
