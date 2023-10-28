import { ResponseMensagem } from './../../../model/response/ResponseMensagem';
import { Condominio } from './../../../model/Condominio';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Predio } from 'src/app/model/Predio';
import { CondominioService } from 'src/app/service/condominios/condominio.service';
import { NonNullableFormBuilder } from '@angular/forms';
import { PredioRequest } from 'src/app/model/request/PredioRequest';

@Component({
  selector: 'app-predio',
  templateUrl: './predio.component.html',
  styleUrls: ['./predio.component.scss']
})
export class PredioComponent {

  public predios: Predio[] = []
  public condominios: Condominio[] = [];
  public condominio: Condominio = new Condominio();
  public predio: PredioRequest = new PredioRequest();
  public respostaSucesso: ResponseMensagem = new ResponseMensagem();

  formCadastrar = this.formBuilder.group({
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
    console.log(this.respostaSucesso.mensagem);
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
    } else {
      this.predios = [];
    }
  }

  carregarPredio(id: number) {
    if(id != 0) {
      this.condominioService.getPredio(id).subscribe(
        (res) => {
          this.predio.idCondominio = res.condominio?.id;
          this.predio.nome = res.nome;
        }
      )
    }
  }

  cadastrarPredio() {
    this.condominioService.adicionarPredio(this.formCadastrar.value).subscribe(
      (res) => {
        window.location.reload();
      },
      (httpError) => {
        alert(httpError.error.mensagem);
      }
    );
  }

  editarPredio(idPredio: number) {
    this.condominioService.editarPredio(idPredio, this.predio).subscribe(
      (res) => {
        this.respostaSucesso = res;
      },
      (httpError) => {
        alert(httpError.error.mensagem);
      }
    );
  }

  reload() {
    window.location.reload();
  }

  deletarPredio(predio: Predio) {
    return this.condominioService.deletarPredio(predio).subscribe(
      (response) => {
        window.location.reload();
      },
      (httpError) => {
        alert(httpError);
      }
    );
  }

}
