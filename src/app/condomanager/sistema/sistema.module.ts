import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { CondominioComponent } from './condominios/condominio/condominio.component';
import { PrediosComponent } from './condominios/predios/predios.component';
import { SistemaComponent } from './sistema.component';
import { DashComponent } from './dashboard/dash.component';


@NgModule({
  declarations: [
    CondominioComponent,
    PrediosComponent,
    SistemaComponent,
    DashComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule
  ],
  exports: [
    SistemaComponent
  ]
})
export class SistemaModule { }
