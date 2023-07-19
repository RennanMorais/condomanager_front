import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondominioComponent } from './condominios/condominio/condominio.component';
import { DashComponent } from './dashboard/dash.component';

const routes: Routes = [
  {
    path:'',
    component: DashComponent
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
