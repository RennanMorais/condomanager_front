import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'condomanager/sistema'
  },
  {
    path:'condomanager/login',
    loadChildren: () => import('./condomanager/login/login.module').then(m => m.LoginModule)
  },
  {
    path:'condomanager/sistema',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./condomanager/sistema/sistema.module').then(m => m.SistemaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
