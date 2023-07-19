import { Observable, catchError, first, of, tap } from 'rxjs';
import { CondominioService } from './../../../../service/condominios/condominio.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { Condominio } from 'src/app/model/Condominio';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-condominio',
  templateUrl: './condominio.component.html',
  styleUrls: ['./condominio.component.scss']
})
export class CondominioComponent implements OnInit {

  public condominios: Condominio[] = [];

  constructor(
    private condominioService: CondominioService,
  ) {

  }

  ngOnInit(): void {
    this.condominioService.getCondominios().subscribe(
      (res) => {
        this.condominios = res;
      },
      (httpError) => {

        alert(httpError.error.mensagem);
      }
    );
  }

  onError(errorMsg: string) {
    alert(errorMsg);
  }

}
