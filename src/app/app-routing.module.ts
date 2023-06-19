import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'condomanager/sistema'
  },
  {
    path:'condomanager/sistema',
    loadChildren: () => import('./condomanager/sistema/sistema.module').then(m => m.SistemaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
