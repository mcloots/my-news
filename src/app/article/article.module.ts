import {NgModule} from '@angular/core';
import {ArticleComponent} from './article.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {ArticleService} from './article.service';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ArticleComponent,
    ArticleDetailComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ArticleComponent,
    ArticleDetailComponent
  ],
  providers: [
    ArticleService
  ]
})
export class ArticleModule {
}
