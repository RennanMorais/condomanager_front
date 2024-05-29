import { CondominioService } from './../../../service/condominios/condominio.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apartamento } from 'src/app/model/Apartamento';
import { DisponibilidadeAluguel } from 'src/app/model/DisponibilidadeAluguelRequest';
import { Predio } from 'src/app/model/Predio';

@Component({
  selector: 'app-apartamentos',
  templateUrl: './apartamentos.component.html',
  styleUrls: ['./apartamentos.component.css']
})
export class ApartamentosComponent {

  predios: Predio[] = [];
  disponibilidadeAluguelRequest: DisponibilidadeAluguel = new DisponibilidadeAluguel;

  constructor(
    private condominioService: CondominioService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.carregarPrediosPorCondominio();
  }

  carregarPrediosPorCondominio() {
    var idCond = parseInt(localStorage.getItem("condp")!);
    this.condominioService.getPrediosPorCondominio(idCond).subscribe(
      (res) => {
        this.predios = res;

        console.log(this.predios);
      },
      (httpError) => {
        console.log(httpError.error.mensagem);
      }
    );
  }

  alterarDisponibilidadeAluguel(apto: Apartamento) {

    this.disponibilidadeAluguelRequest.idApartamento = apto.id;

    if(apto.dispAluguel) {
      this.disponibilidadeAluguelRequest.dispAluguel = false;
    } else {
      this.disponibilidadeAluguelRequest.dispAluguel = true;
    }

    this.condominioService.alterarDisponibilidadeAluguel(this.disponibilidadeAluguelRequest).subscribe(
      (res) => {
        window.location.reload()
        console.log(res);
      },
      (httpError) => {
        console.log(httpError.error.mensagem);
      }
    );
  }

}
