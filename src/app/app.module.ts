import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CondominioComponent } from './condomanager/condominios/condominio/condominio.component';
import { DashboardComponent } from './condomanager/condominios/dashboard/dashboard.component';
import { MenuComponent } from './condomanager/menu/menu.component';
import { LoginComponent } from './condomanager/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { PredioComponent } from './condomanager/condominios/predio/predio.component';

@NgModule({
  declarations: [
    AppComponent,
    CondominioComponent,
    DashboardComponent,
    MenuComponent,
    LoginComponent,
    PredioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
