import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormMode} from '../../../common/misc/helper';
import {FormBuilder} from '@angular/forms';
import {HttpService} from '../../../services/http.service';

interface InputData {
  mode: FormMode;
  element: any;
}

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {

  FormMode = FormMode;
  form;
  roles = [{id: 'ADMIN', label: 'Админ'}, {id: 'USER', label: 'Пользователь'}];

  constructor(public dialogRef: MatDialogRef<AddUserModalComponent>,
              private http: HttpService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: InputData) { }

  ngOnInit(): void {
    this.form = this.fb.group({...this.data.element});
  }

  save() {
    this.http.put('/users/' + this.data.element.id, this.form.getRawValue()).subscribe(res => {
      this.dialogRef.close(true);
    });
  }

}
