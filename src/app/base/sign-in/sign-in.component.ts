import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SignUpComponent} from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignInComponent>,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  openRegistration() {
    this.dialogRef.close();
    this.matDialog.open(SignUpComponent)
  }

}
