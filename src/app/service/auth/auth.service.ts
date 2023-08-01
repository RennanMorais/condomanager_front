import jwt_decode from 'jwt-decode';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/model/Auth';
import { UserLogin } from 'src/app/model/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any = localStorage.getItem('accessToken');
  dataAtual: Date = new Date();
  segundosDataAtual: number = Math.floor(this.dataAtual.getTime() / 1000);

  constructor(
    private httpClient: HttpClient
  ) { }

  fazerLogin(login: UserLogin): Observable<Auth> {
    return this.httpClient.post<Auth>('/api/condomanager/sistema/login', login);
  }

  autenticar() {
    var decodeToken = this.getDecodeToken(this.token);

    if(decodeToken.exp > this.segundosDataAtual) {
      return true;
    }

    return false;
  }

  getDecodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
