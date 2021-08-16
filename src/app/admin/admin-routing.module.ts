import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatusListComponent} from './status/status-list/status-list.component';
import {CategoryListComponent} from './category/category-list/category-list.component';
import {StatusFormComponent} from './status/status-form/status-form.component';
import {CategoryFormComponent} from './category/category-form/category-form.component';

const routes: Routes = [
  {path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
  {path: 'status', loadChildren: () => import('./status/status.module').then(m => m.StatusModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
