import { Cidade } from './../../model/Cidade';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Estado } from 'src/app/model/Estado';

@Injectable({
  providedIn: 'root'
})
export class DominiosService {

  host: string = 'api/condomanager/sistema';

  headers: HttpHeaders = new HttpHeaders()
  .append('content-type', 'application/json')
  .append('Authorization', ''+localStorage.getItem('accessToken'));

  constructor(private http: HttpClient) { }

  public getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.host + '/dominio/estados', {headers:  this.headers});
  }

  public getCidadesPorEstado(id: number): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.host + '/dominio/cidades/estado/' + id, {headers:  this.headers});
  }

}
