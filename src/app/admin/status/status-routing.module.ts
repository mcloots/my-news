import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatusListComponent} from './status-list/status-list.component';
import {StatusFormComponent} from './status-form/status-form.component';

const routes: Routes = [
  {path: '', component: StatusListComponent},
  {path: 'form', component: StatusFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule {
}
