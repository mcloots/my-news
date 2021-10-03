import {NgModule} from '@angular/core';
import {ArticleComponent} from './article.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {ArticleService} from './article.service';
import {SharedModule} from '../shared/shared.module';
import { ArticleFormComponent } from './article-form/article-form.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SecurityInterceptor} from '../security/security.interceptor';


@NgModule({
  declarations: [
    ArticleComponent,
    ArticleDetailComponent,
    ArticleFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ArticleComponent,
    ArticleDetailComponent
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
