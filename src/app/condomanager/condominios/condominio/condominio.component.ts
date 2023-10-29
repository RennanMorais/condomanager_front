import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DominiosService } from './../../../service/dominios/dominios.service';
import { Component } from '@angular/core';
import { Cidade } from 'src/app/model/Cidade';
import { Condominio } from 'src/app/model/Condominio';
import { Estado } from 'src/app/model/Estado';
import { CondominioRequest } from 'src/app/model/request/CondominioRequest';
import { ResponseMensagem } from 'src/app/model/response/ResponseMensagem';
import { CondominioService } from 'src/app/service/condominios/condominio.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-condominio',
  templateUrl: './condominio.component.html',
  styleUrls: ['./condominio.component.scss']
})
export class CondominioComponent {

  public condominios: Condominio[] = [];
  public condominio: CondominioRequest = new CondominioRequest();
  public responsemensagem: ResponseMensagem = new ResponseMensagem();
  readonly displayedColumns: string[] = ['condominio', 'cnpj', 'email', 'endereco', 'numero', 'cidade', 'estado', 'acoes'];

  constructor(
    private condominioService: CondominioService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.carregarCondominios();
  }

  openCadCondominioModal() {
    this.dialog.open(CadastroCondominioDialog);
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

  deletarCondominio(condominio: Condominio) {
    return this.condominioService.deletarCondominio(condominio).subscribe(
      (response) => {
        window.location.reload();
        this.responsemensagem = response;
      },
      (httpError) => {
        console.log(httpError.error);
      }
    );
  }

}

@Component({
  selector: 'cadastrar-condominio-dialog',
  templateUrl: 'components/cadastrar-condominio-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class CadastroCondominioDialog {

  public request: CondominioRequest = new CondominioRequest();
  public estados: Estado[] = [];
  public cidades: Cidade[] = [];

  constructor(
    private condominioService: CondominioService,
    private dominios: DominiosService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.carregarEstados();
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
    console.log(this.request);
    this.condominioService.adicionarCondominio(this.request).subscribe(
      (res) => {
        window.location.reload();
      },
      (httpError) => {
        console.log(httpError.error);
        for(var i = 0; httpError.error.erros.length; i++) {
          console.log('ERRO: '+httpError.error.erros[i].mensagem);
        }
      }
    );
  }

}
