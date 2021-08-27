import {NgModule} from '@angular/core';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryFormComponent} from './category-form/category-form.component';
import {SharedModule} from '../../shared/shared.module';
import {CategoryService} from './category.service';
import {CategoryRoutingModule} from './category-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SecurityInterceptor} from '../../security/security.interceptor';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule
  ],
  exports: [
    CategoryListComponent,
    CategoryFormComponent
  ],
  providers: [
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    }
  ]
})
export class CategoryModule {
}
