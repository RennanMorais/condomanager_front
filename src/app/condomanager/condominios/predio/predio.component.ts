import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Predio } from 'src/app/model/Predio';
import { CondominioService } from 'src/app/service/condominios/condominio.service';

@Component({
  selector: 'app-predio',
  templateUrl: './predio.component.html',
  styleUrls: ['./predio.component.css']
})
export class PredioComponent {

  public predios: Predio[] = []

  constructor(
    private condominioService: CondominioService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.condominioService.getPredios().subscribe(
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
