import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'condomanager/login'
  },
  {
    path:'condomanager/login',
    loadChildren: () => import('./condomanager/login/login.module').then(m => m.LoginModule)
  },
  {
    path:'condomanager/sistema',
    loadChildren: () => import('./condomanager/condominios/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:'condomanager/sistema/condominios',
    loadChildren: () => import('./condomanager/condominios/condominio/condominio.module').then(m => m.CondominioModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
