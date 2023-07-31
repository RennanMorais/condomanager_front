import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Condominio } from '../../model/Condominio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {

  headers: HttpHeaders = new HttpHeaders()
  .append('content-type', 'application/json')
  .append('Authorization', ''+localStorage.getItem('accessToken'));

  constructor(private httpClient: HttpClient) { }

  public getCondominios(): Observable<Condominio[]> {
    return this.httpClient.get<Condominio[]>('/api/condomanager/sistema/condominio', { headers: this.headers });
  }

}
