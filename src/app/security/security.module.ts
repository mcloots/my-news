import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security/security.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SecurityModule { }
