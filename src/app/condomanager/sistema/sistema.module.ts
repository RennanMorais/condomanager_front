import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { CondominioComponent } from './condominios/condominio/condominio.component';
import { PrediosComponent } from './condominios/predios/predios.component';
import { SistemaComponent } from './sistema.component';


@NgModule({
  declarations: [
    CondominioComponent,
    PrediosComponent,
    SistemaComponent
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
