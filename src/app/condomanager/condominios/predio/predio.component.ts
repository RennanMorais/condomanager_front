import { ResponseMensagem } from './../../../model/response/ResponseMensagem';
import { Condominio } from './../../../model/Condominio';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Predio } from 'src/app/model/Predio';
import { CondominioService } from 'src/app/service/condominios/condominio.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PredioRequest } from 'src/app/model/request/PredioRequest';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {Inject} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-predio',
  templateUrl: './predio.component.html',
  styleUrls: ['./predio.component.scss']
})
export class PredioComponent {

  public predios: Predio[] = []
  public condominios: Condominio[] = [];
  public predio: PredioRequest = new PredioRequest();
  public condominio: Condominio = new Condominio();
  public respostaSucesso: ResponseMensagem = new ResponseMensagem();
  readonly displayedColumns: string[] = ['bloco', 'condominio', 'acoes'];

  constructor(
    private condominioService: CondominioService,
    public dialog: MatDialog,
    private router: Router
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

  openDeletarPredioModal(predio: Predio) {
    this.dialog.open(DeletarPredioDialog, {
      data: {
        id: predio.id,
        nome: predio.nome
      }
    });
  }

  openCadastrarPredioModal() {
    this.dialog.open(CadastrarPredioDialog);
  }

  openEditarPredioModal(predio: Predio) {
    this.dialog.open(EditarPredioDialog, {
      data: {
        id: predio.id,
        nome: predio.nome,
        condominio: predio.condominio
      }
    });
  }

}


//Component Modal deletar Predio
@Component({
  selector: 'deletar-predio-dialog',
  templateUrl: 'components/deletar-predio-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class DeletarPredioDialog {

  public predio: Predio = this.data;

  constructor(
    private condominioService: CondominioService,
    public dialogDef: MatDialogRef<DeletarPredioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Predio,
  ) {

  }

  ngOnInit(): void {

  }

  deletarPredio() {
    return this.condominioService.deletarPredio(this.data).subscribe(
      (response) => {
        window.location.reload();
      },
      (httpError) => {
        alert(httpError);
      }
    );
  }

  closeDeleteModal() {
    this.dialogDef.close();
  }

}

//Component Modal Cadastrar Predio
@Component({
  selector: 'cadastrar-predio-dialog',
  templateUrl: 'components/cadastrar-predio-dialog.html',
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
export class CadastrarPredioDialog {

  public predio: PredioRequest = new PredioRequest();
  public condominios: Condominio[] = [];

  constructor(
    private condominioService: CondominioService,
    public dialogDef: MatDialogRef<DeletarPredioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Predio,
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

  cadastrarPredio() {
    this.condominioService.adicionarPredio(this.predio).subscribe(
      (res) => {
        window.location.reload();
      },
      (httpError) => {
        alert(httpError.error.mensagem);
      }
    );
  }

}


//Component Modal editar Predio
@Component({
  selector: 'editar-predio-dialog',
  templateUrl: 'components/editar-predio-dialog.html',
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
    MatProgressSpinnerModule
  ]
})
export class EditarPredioDialog {

  public request: PredioRequest = new PredioRequest();
  public predio: Predio = this.data;
  public condominios: Condominio[] = [];
  public respostaSucesso: ResponseMensagem = new ResponseMensagem();

  constructor(
    private condominioService: CondominioService,
    public dialogDef: MatDialogRef<EditarPredioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Predio,
  ) {

  }

  ngOnInit(): void {
    this.carregarCondominios();
    this.request.idCondominio = this.data.condominio?.id;
    this.request.nome = this.data.nome;
    console.log(this.predio);
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

  editarPredio(idPredio: number) {
    this.condominioService.editarPredio(idPredio, this.request).subscribe(
      (res) => {
        this.respostaSucesso = res;
      },
      (httpError) => {
        alert(httpError.error.mensagem);
      }
    );
  }

  closeDeleteModal() {
    this.dialogDef.close();
    if(this.respostaSucesso.mensagem != undefined) {
      window.location.reload();
    }
  }

}
