import { Endereco } from './../../../model/Endereco';
import { DominiosService } from './../../../service/dominios/dominios.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Cidade } from 'src/app/model/Cidade';
import { Condominio } from 'src/app/model/Condominio';
import { Estado } from 'src/app/model/Estado';
import { CondominioRequest } from 'src/app/model/request/CondominioRequest';
import { CondominioService } from 'src/app/service/condominios/condominio.service';

@Component({
  selector: 'app-condominio',
  templateUrl: './condominio.component.html',
  styleUrls: ['./condominio.component.css']
})
export class CondominioComponent {
[x: string]: any;

  public condominios: Condominio[] = [];
  public estados: Estado[] = [];
  public cidades: Cidade[] = [];
  public condominio: CondominioRequest = new CondominioRequest;

  constructor(
    private condominioService: CondominioService,
    private dominios: DominiosService,
    private formBuilder: NonNullableFormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.carregarCondominios();
    this.carregarEstados();
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

  carregarEstados() {
    this.dominios.getEstados().subscribe(
      (res) => {
        this.estados = res;
      },
      (httpError) => {
        alert(httpError.error.mensagem);
      }
    );
  }

  carregarCidadePorEstado(id: number) {
    this.dominios.getCidadesPorEstado(id).subscribe(
      (res) => {
        this.cidades = res;
      },
      (httpError) => {
        alert(httpError.error.mensagem);
      }
    );
  }

  cadastrarCondominio() {
    this.condominioService.adicionarCondominio(this.condominio).subscribe(
      (res) => {
        window.location.reload();
      },
      (httpError) => {
        console.log(httpError.error);
        console.log(this.condominio);
        for(var i = 0; httpError.error.erros.length; i++) {
          alert('ERRO: '+httpError.error.erros[i].mensagem);
        }
      }
    );
  }

}
