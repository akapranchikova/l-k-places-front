import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news/news.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddNewsModalComponent } from './add-news-modal/add-news-modal.component';
import { PostPageComponent } from './post-page/post-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../common/material.module';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
  {
    path: ':id',
    component: PostPageComponent
  }
];

@NgModule({
  declarations: [NewsComponent, AddNewsModalComponent, PostPageComponent],
    imports: [
        [RouterModule.forChild(routes)],
        CommonModule,
        MatIconModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
  entryComponents: [
    AddNewsModalComponent
  ]
})
export class NewsModule {
}
