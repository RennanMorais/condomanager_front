import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DominiosService } from './../../../service/dominios/dominios.service';
import { Component, Inject } from '@angular/core';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Predio } from 'src/app/model/Predio';

@Component({
  selector: 'app-condominio',
  templateUrl: './condominio.component.html',
  styleUrls: ['./condominio.component.scss']
})
export class CondominioComponent {

  public condominios: Condominio[] = [];
  public condominio: CondominioRequest = new CondominioRequest();
  public responsemensagem: ResponseMensagem = new ResponseMensagem();
  public responsemensagemErro: ResponseMensagem = new ResponseMensagem();
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

  openEditarCondominioModal(condominio: Condominio) {
    this.dialog.open(EditarCondominioDialog, {
      data: {
        id: condominio.id,
        nome: condominio.nome,
        cnpj: condominio.cnpj,
        email: condominio.email,
        endereco: condominio.endereco
      }
    });
  }

  openDeletarCondominioModal(condominio: Condominio) {
    this.dialog.open(DeletarCondominioDialog, {
      data: {
        id: condominio.id,
        nome: condominio.nome,
        cnpj: condominio.cnpj,
        email: condominio.email,
        endereco: condominio.endereco
      }
    });
  }

  carregarCondominios() {
    this.condominioService.getCondominios().subscribe(
      (res) => {
        this.condominios = res;
      },
      (httpError) => {
        console.log(httpError.error.mensagem);
        this.responsemensagemErro = httpError.error;
      }
    );
  }

  cadastrarCondominio() {
    this.condominioService.adicionarCondominio(this.condominio).subscribe(
      (res) => {
        window.location.reload();
        this.responsemensagem = res;
      },
      (httpError) => {
        console.log(httpError.error);
        console.log(this.condominio);
        for(var i = 0; httpError.error.erros.length; i++) {
          console.log('ERRO: '+httpError.error.erros[i].mensagem);
        }
        window.location.reload();
      }
    );
  }

}


///Modal de cadastro de condominio
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
        console.log(httpError.error.mensagem);
        window.location.reload();
      }
    );
  }

  carregarCidadePorEstado(id: number) {
    this.dominios.getCidadesPorEstado(id).subscribe(
      (res) => {
        this.cidades = res;
      },
      (httpError) => {
        console.log(httpError.error.mensagem);
        window.location.reload();
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
        window.location.reload();
      }
    );
  }

}


///Modal de edição de condominio
@Component({
  selector: 'editar-condominio-dialog',
  templateUrl: 'components/editar-condominio-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressBarModule
  ]
})

export class EditarCondominioDialog {

  public request: CondominioRequest = new CondominioRequest();
  public estados: Estado[] = [];
  public cidades: Cidade[] = [];
  public respostaSucesso: ResponseMensagem = new ResponseMensagem;

  constructor(
    private condominioService: CondominioService,
    private dominios: DominiosService,
    public dialog: MatDialog,
    public dialogDef: MatDialogRef<EditarCondominioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Condominio,
  ) {

  }

  ngOnInit(): void {
    this.carregarEstados();
    this.carregarCidadePorEstado(this.data.endereco.estado.id);
    this.request.id = this.data.id;
    this.request.nome = this.data.nome;
    this.request.cnpj = this.data.cnpj;
    this.request.email = this.data.email;
    this.request.endereco.endereco = this.data.endereco.endereco;
    this.request.endereco.numero = this.data.endereco.numero;
    this.request.endereco.bairro = this.data.endereco.bairro;
    this.request.endereco.complemento = this.data.endereco.bairro;
    this.request.endereco.idEstado = this.data.endereco.estado.id;
    this.request.endereco.idCidade = this.data.endereco.cidade.id;
    this.request.endereco.id = this.data.endereco.id;
  }

  carregarEstados() {
    this.dominios.getEstados().subscribe(
      (res) => {
        this.estados = res;
      },
      (httpError) => {
        console.log(httpError.error.mensagem);
        window.location.reload();
      }
    );
  }

  carregarCidadePorEstado(id: number) {
    this.dominios.getCidadesPorEstado(id).subscribe(
      (res) => {
        this.cidades = res;
      },
      (httpError) => {
        console.log(httpError.error.mensagem);
        window.location.reload();
      }
    );
  }

  editarCondominio(idCondominio: number) {
    console.log(this.request);
    this.condominioService.editarCondominio(idCondominio, this.request).subscribe(
      (res) => {
        this.respostaSucesso = res;
      },
      (httpError) => {
        console.log(httpError.error);
        for(var i = 0; httpError.error.erros.length; i++) {
          console.log('ERRO: '+httpError.error.erros[i].mensagem);
        }
        window.location.reload();
      }
    );
  }

  closeModal() {
    this.dialogDef.close();
    if(this.respostaSucesso.mensagem != undefined) {
      window.location.reload();
    }
  }

}

//Component Modal deletar condominio
@Component({
  selector: 'deletar-condominio-dialog',
  templateUrl: 'components/deletar-condominio-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class DeletarCondominioDialog {

  public condominio: Condominio = this.data;
  public responsemensagem: ResponseMensagem = new ResponseMensagem;

  constructor(
    private condominioService: CondominioService,
    public dialogDef: MatDialogRef<DeletarCondominioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Condominio,
  ) {

  }

  ngOnInit(): void {

  }

  deletarCondominio(condominio: Condominio) {
    return this.condominioService.deletarCondominio(condominio.id).subscribe(
      (response) => {
        window.location.reload();
        this.responsemensagem = response;
      },
      (httpError) => {
        console.log(httpError.error);
        window.location.reload();
      }
    );
  }

  closeModal() {
    this.dialogDef.close();
  }

}
