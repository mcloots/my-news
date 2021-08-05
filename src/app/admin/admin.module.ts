import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CategoryModule} from './category/category.module';
import {StatusModule} from './status/status.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CategoryModule,
    StatusModule
  ],
  exports: [
    CategoryModule,
    StatusModule
  ]
})
export class AdminModule { }
