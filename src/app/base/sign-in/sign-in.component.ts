import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: '',
    password: ''
  });

  constructor(public dialogRef: MatDialogRef<SignInComponent>,
              private matDialog: MatDialog,
              private fb: FormBuilder,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  openRegistration() {
    this.dialogRef.close();
    this.matDialog.open(SignUpComponent, {
      width: '370px',
      autoFocus: false,
    });
  }

  signIn() {
    this.authService.signIn( this.form.getRawValue()).subscribe(res => {
      this.dialogRef.close();
    });
  }

}
