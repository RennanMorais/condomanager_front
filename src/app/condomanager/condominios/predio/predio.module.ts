import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredioRoutingModule } from './predio-routing.module';
import { PredioComponent } from './predio.component';


@NgModule({
  declarations: [
    PredioComponent
  ],
  imports: [
    CommonModule,
    PredioRoutingModule
  ]
})
export class PredioModule { }
