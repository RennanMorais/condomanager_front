import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
    loadChildren: () => import('./condomanager/condominios/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path:'condomanager/sistema/condominios',
    loadChildren: () => import('./condomanager/condominios/condominio/condominio.module').then(m => m.CondominioModule),
    canActivate: [AuthGuard]
  },
  {
    path:'condomanager/sistema/predios',
    loadChildren: () => import('./condomanager/condominios/predio/predio.module').then(m => m.PredioModule),
    canActivate: [AuthGuard]
  },
  {
    path:'condomanager/sistema/apartamentos',
    loadChildren: () => import('./condomanager/condominios/apartamentos/apartamentos.module').then(m => m.ApartamentosModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
