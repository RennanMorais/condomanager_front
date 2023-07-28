import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CondominioComponent } from './condomanager/condominios/condominio/condominio.component';
import { DashboardComponent } from './condomanager/condominios/dashboard/dashboard.component';
import { MenuComponent } from './condomanager/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CondominioComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
