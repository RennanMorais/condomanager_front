import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemaComponent } from './sistema.component';
import { CondominioComponent } from './condominios/condominio/condominio.component';

const routes: Routes = [
  {
    path:'',
    component: SistemaComponent
  },
  {
    path:'condominios',
    component: CondominioComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
