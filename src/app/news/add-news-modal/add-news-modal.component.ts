import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormMode} from '../../common/misc/helper';

@Component({
  selector: 'app-add-news-modal',
  templateUrl: './add-news-modal.component.html',
  styleUrls: ['./add-news-modal.component.scss']
})
export class AddNewsModalComponent implements OnInit {

  FormMode = FormMode;
  constructor(public dialogRef: MatDialogRef<AddNewsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }



}
