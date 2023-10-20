import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Predio } from 'src/app/model/Predio';
import { CondominioService } from 'src/app/service/condominios/condominio.service';
import { Condominio } from 'src/app/model/Condominio';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-predio',
  templateUrl: './predio.component.html',
  styleUrls: ['./predio.component.css']
})
export class PredioComponent {

  predios: Predio[] = []
  condominios: Condominio[] = [];

  form = this.formBuilder.group({
    idCondominio: 0,
    nome:['']
  });

  constructor(
    private condominioService: CondominioService,
    private formBuilder: NonNullableFormBuilder,
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
        console.log(httpError.error.mensagem);
      }
    );
  }

  carregarPrediosPorCondominio(id: number) {
    if(id != 0) {
      this.condominioService.getPrediosPorCondominio(id).subscribe(
        (res) => {
          this.predios = res;
        },
        (httpError) => {
          alert(httpError.error.mensagem);
        }
      );
    }
  }

  cadastrarPredio() {
    this.condominioService.adicionarPredio(this.form.value).subscribe(
      (res) => {
        window.location.reload();
      },
      (httpError) => {
        alert(httpError.error.mensagem);
      }
    );
  }

  deletarPredio(predio: Predio) {
    return this.condominioService.deletarPredio(predio).subscribe(
      (response) => {
        window.location.reload();
      },
      (httpError) => {

      }
    );
  }

}
