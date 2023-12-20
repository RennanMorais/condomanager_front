import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CondominioService } from './service/condominios/condominio.service';
import { Condominio } from './model/Condominio';
import { ResponseMensagem } from './model/response/ResponseMensagem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
