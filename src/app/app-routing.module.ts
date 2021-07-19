import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleComponent } from './article/article.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { HomeComponent } from './home/home.component';
import {StatusListComponent} from './status-list/status-list.component';
import {StatusFormComponent} from './status-form/status-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'admin/category', component: CategoryListComponent },
  { path: 'admin/category/form', component: CategoryFormComponent },
  { path: 'admin/status', component: StatusListComponent },
  { path: 'admin/status/form', component: StatusFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
