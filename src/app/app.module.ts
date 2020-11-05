import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './common/material.module';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {HttpService} from './services/http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EventService} from './services/event.service';
import {TokenInterceptor} from './services/token.interceptor';
window['L_PREFER_CANVAS'] = true;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatDialogModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    HttpService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
