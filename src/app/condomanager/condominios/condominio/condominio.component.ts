import { Component } from '@angular/core';
import { Condominio } from 'src/app/model/Condominio';
import { CondominioService } from 'src/app/service/condominios/condominio.service';

@Component({
  selector: 'app-condominio',
  templateUrl: './condominio.component.html',
  styleUrls: ['./condominio.component.css']
})
export class CondominioComponent {

  public condominios: Condominio[] = [];

  constructor(
    private condominioService: CondominioService
  ) {

  }

  ngOnInit(): void {
    this.carregarCondominios();
  }

  carregarCondominios() {
    this.condominioService.getCondominios().subscribe(
      (res) => {
        this.condominios = res;
      },
      (httpError) => {
        alert(httpError.error.mensagem);
      }
    );
  }

}
