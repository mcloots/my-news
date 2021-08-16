import {NgModule} from '@angular/core';
import {StatusListComponent} from './status-list/status-list.component';
import {StatusFormComponent} from './status-form/status-form.component';
import {SharedModule} from '../../shared/shared.module';
import {StatusService} from './status.service';
import {StatusRoutingModule} from './status-routing.module';


@NgModule({
  declarations: [
    StatusListComponent,
    StatusFormComponent
  ],
  imports: [
    SharedModule,
    StatusRoutingModule
  ],
  exports: [
    StatusListComponent,
    StatusFormComponent
  ],
  providers: [
    StatusService
  ]
})
export class StatusModule {
}
