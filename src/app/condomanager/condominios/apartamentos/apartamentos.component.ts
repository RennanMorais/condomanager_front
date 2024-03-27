import { CondominioService } from './../../../service/condominios/condominio.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Predio } from 'src/app/model/Predio';

@Component({
  selector: 'app-apartamentos',
  templateUrl: './apartamentos.component.html',
  styleUrls: ['./apartamentos.component.css']
})
export class ApartamentosComponent {

  predios: Predio[] = [];
  checked: boolean = false;

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
}
