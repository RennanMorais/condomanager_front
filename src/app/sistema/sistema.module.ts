import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { CondominioComponent } from './condominios/condominio/condominio.component';
import { PrediosComponent } from './condominios/predios/predios.component';


@NgModule({
  declarations: [
    CondominioComponent,
    PrediosComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule
  ]
})
export class SistemaModule { }
