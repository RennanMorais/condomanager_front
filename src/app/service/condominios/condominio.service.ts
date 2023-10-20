import { Condominio } from 'src/app/model/Condominio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Predio } from 'src/app/model/Predio';
import { ResponseMensagem } from 'src/app/model/response/ResponseMensagem';
import { PredioRequest } from 'src/app/model/request/PredioRequest';
import { CondominioRequest } from 'src/app/model/request/CondominioRequest';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {

  host: string = 'api/condomanager/sistema';

  headers: HttpHeaders = new HttpHeaders()
  .append('content-type', 'application/json')
  .append('Authorization', ''+localStorage.getItem('accessToken'));

  constructor(private http: HttpClient) { }

  //Condominios
  public getCondominios(): Observable<Condominio[]> {
    return this.http.get<Condominio[]>(this.host + '/condominio', { headers: this.headers })
    .pipe(
      delay(1000)
    );
  }

  //Predios
  public getPredios(): Observable<Predio[]> {
    return this.http.get<Predio[]>(this.host + '/predios/listar', { headers: this.headers });
  }

  //Predios por condominio
  public getPrediosPorCondominio(id: number): Observable<Predio[]> {
    return this.http.get<Predio[]>(this.host + '/predios/condominio/' + id, { headers: this.headers });
  }

  public adicionarCondominio(cond: Partial<CondominioRequest>): Observable<ResponseMensagem> {
    return this.http.post<ResponseMensagem>(this.host + '/condominio/cadastrar', cond, { headers: this.headers});
  }

  public adicionarPredio(predio: Partial<PredioRequest>): Observable<ResponseMensagem> {
    return this.http.post<ResponseMensagem>(this.host + '/predio/cadastrar/', predio, { headers: this.headers});
  }

  public deletarPredio(predio: Predio): Observable<ResponseMensagem> {
    return this.http.delete<ResponseMensagem>(this.host + '/predio/deletar/' + predio.id, { headers: this.headers});
  }

}
