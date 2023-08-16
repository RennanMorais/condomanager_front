import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Predio } from 'src/app/model/Predio';
import { CondominioService } from 'src/app/service/condominios/condominio.service';
import { CondominioComponent } from './../condominio/condominio.component';
import { Condominio } from 'src/app/model/Condominio';

@Component({
  selector: 'app-predio',
  templateUrl: './predio.component.html',
  styleUrls: ['./predio.component.css']
})
export class PredioComponent {

  public predios: Predio[] = []
  public condominios: Condominio[] = [];

  constructor(
    private condominioService: CondominioService,
    private router: Router,
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

  carregarPrediosPorCondominio(id: number) {
    this.condominioService.getPrediosPorCondominio(id).subscribe(
      (res) => {
        this.predios = res;
      },
      (httpError) => {
        alert(httpError.error.mensagem);
      }
    );
  }

  deletarPredio(id: number) {
    return this.condominioService.deletarPredio(id).subscribe(
      (response) => {
        window.location.reload();
      },
      (httpError) => {

      }
    );
  }

}
