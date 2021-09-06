import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ArticleComponent } from './article/article.component';
import { CategoryFormComponent } from './admin/category/category-form/category-form.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { HomeComponent } from './home/home.component';
import {StatusListComponent} from './admin/status/status-list/status-list.component';
import {StatusFormComponent} from './admin/status/status-form/status-form.component';
import {SecurityComponent} from './security/security/security.component';
import {AuthGuard} from './security/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  { path: 'login', component: SecurityComponent},
  { path: 'register', component: SecurityComponent},
  { path: 'logout', component: SecurityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
