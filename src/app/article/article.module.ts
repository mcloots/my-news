import {NgModule} from '@angular/core';
import {ArticleComponent} from './article.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {ArticleService} from './article.service';
import {SharedModule} from '../shared/shared.module';
import { ArticleFormComponent } from './article-form/article-form.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SecurityInterceptor} from '../security/security.interceptor';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { ArticleListComponent } from './article-list/article-list.component';


@NgModule({
  declarations: [
    ArticleComponent,
    ArticleDetailComponent,
    ArticleFormComponent,
    CategoryFilterComponent,
    ArticleListComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ArticleComponent,
    ArticleDetailComponent,
    CategoryFilterComponent
  ],
  providers: [
    ArticleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    }
  ]
})
export class ArticleModule {
}
