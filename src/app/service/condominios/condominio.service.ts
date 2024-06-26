import { Condominio } from 'src/app/model/Condominio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Predio } from 'src/app/model/Predio';
import { ResponseMensagem } from 'src/app/model/response/ResponseMensagem';
import { PredioRequest } from 'src/app/model/request/PredioRequest';
import { CondominioRequest } from 'src/app/model/request/CondominioRequest';
import { DisponibilidadeAluguel } from 'src/app/model/DisponibilidadeAluguelRequest';

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
  public adicionarCondominio(cond: Partial<CondominioRequest>): Observable<ResponseMensagem> {
    return this.http.post<ResponseMensagem>(this.host + '/condominio/cadastrar', cond, { headers: this.headers});
  }

  public editarCondominio(idCondominio: number, cond: Partial<CondominioRequest>): Observable<ResponseMensagem> {
    return this.http.put<ResponseMensagem>(this.host + '/condominio/editar/' + idCondominio, cond, { headers: this.headers});
  }

  public getCondominios(): Observable<Condominio[]> {
    return this.http.get<Condominio[]>(this.host + '/condominio', { headers: this.headers });
  }

  public getCondominiPrincipal(): Observable<Condominio> {
    return this.http.get<Condominio>(this.host + '/condominio/principal', { headers: this.headers });
  }

  public deletarCondominio(id: number): Observable<ResponseMensagem> {
    return this.http.delete<ResponseMensagem>(this.host + '/condominio/deletar/' + id, { headers: this.headers });
  }

  public alteraCondominioPrincipal(id: number): Observable<ResponseMensagem> {
    return this.http.put<ResponseMensagem>(this.host + '/condominio/principal/alterar/' + id, undefined, { headers: this.headers });
  }

  //Predios
  public getPredios(): Observable<Predio[]> {
    return this.http.get<Predio[]>(this.host + '/predios/listar', { headers: this.headers });
  }

  public getPredio(id: number): Observable<Predio> {
    return this.http.get<Predio>(this.host + '/predios/buscar/' + id, { headers: this.headers });
  }

  public getPrediosPorCondominio(id: number): Observable<Predio[]> {
    return this.http.get<Predio[]>(this.host + '/predios/condominio/' + id, { headers: this.headers });
  }

  public adicionarPredio(predio: Partial<PredioRequest>): Observable<ResponseMensagem> {
    return this.http.post<ResponseMensagem>(this.host + '/predio/cadastrar/', predio, { headers: this.headers});
  }

  public editarPredio(idPredio: number, predio: Partial<PredioRequest>): Observable<ResponseMensagem> {
    return this.http.put<ResponseMensagem>(this.host + '/predio/editar/' + idPredio, predio, { headers: this.headers});
  }

  public deletarPredio(predio: Predio): Observable<ResponseMensagem> {
    return this.http.delete<ResponseMensagem>(this.host + '/predio/deletar/' + predio.id, { headers: this.headers});
  }

  //Apartamentos
  public alterarDisponibilidadeAluguel(dispAluguel: Partial<DisponibilidadeAluguel>): Observable<ResponseMensagem> {
    return this.http.post<ResponseMensagem>(this.host + '/apartamento/aluguel', dispAluguel, { headers: this.headers});
  }

}
