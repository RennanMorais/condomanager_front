import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredioComponent } from './predio.component';

const routes: Routes = [
  {
    path: '',
    component: PredioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredioRoutingModule { }
