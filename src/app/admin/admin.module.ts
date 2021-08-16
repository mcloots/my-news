import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CategoryModule} from './category/category.module';
import {StatusModule} from './status/status.module';
import {AdminRoutingModule} from './admin-routing.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
}
