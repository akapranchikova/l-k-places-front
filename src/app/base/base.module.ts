import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {MaterialModule} from '../common/material.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GuardService} from '../services/guard.service';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full'
      },
      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then(m => m.NewsModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../events/events.module').then(m => m.EventsModule)
      },
      {
        canActivate: [GuardService],
        path: 'profile',
        loadChildren: () => import('../account/account.module.js').then(m => m.AccountModule)
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then(m => m.MapModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'logs',
        loadChildren: () => import('../logs/logs.module').then(m => m.LogsModule)
      },
    ]
  }
];

@NgModule({
  declarations: [IndexComponent, FooterComponent, HeaderComponent, SignInComponent, SignUpComponent],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SignInComponent,
    SignUpComponent
  ],
})
export class BaseModule {
}
