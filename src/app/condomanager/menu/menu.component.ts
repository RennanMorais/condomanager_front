import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Condominio } from 'src/app/model/Condominio';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CondominioService } from 'src/app/service/condominios/condominio.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  public condominio: Condominio = new Condominio();

  constructor(
    private authService: AuthService,
    private condominioService: CondominioService,
    public dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {
    this.getCondPrincipal();
  }

  logout() {
    this.authService.fazLogout();
  }

  redirecionadorMenu(rota: string) {
    this.router.navigate([rota]);
  }

  getCondPrincipal() {
    this.condominioService.getCondominiPrincipal().subscribe(
      (response) => {
        this.condominio = response;
        var id: any = response.id;
        localStorage.setItem('condp', id);
        console.log(localStorage);
      },
      (httpError) => {
        console.log(httpError.error);
      }
    )
  }

  openTrocarCondModal() {
    this.dialog.open(TrocarCondDialog, {
      data: {
        id: this.condominio.id,
        nome: this.condominio.nome,
        cnpj: this.condominio.cnpj,
        email: this.condominio.email,
        endereco: this.condominio.endereco,
      }
    });
  }

}

//Component Modal editar Predio
@Component({
  selector: 'trocar-condominio-dialog',
  templateUrl: 'components/trocar-condominio-dialog.html',
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
    MatProgressSpinnerModule,
    MatProgressBarModule
  ]
})

export class TrocarCondDialog {

  public condominios: Condominio[] = [];
  public idCond: number = 0;

  constructor(
    private condominioService: CondominioService,
    public dialogDef: MatDialogRef<TrocarCondDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Condominio,
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
        window.location.reload();
      }
    );
  }

  trocarCondominio() {
    this.condominioService.alteraCondominioPrincipal(this.idCond).subscribe(
      (response) => {
        window.location.reload();
      },
      (httpError) => {
        console.log(httpError.error);
      }
    )
  }

  closeTrocarModal() {
    this.dialogDef.close();
  }

}
