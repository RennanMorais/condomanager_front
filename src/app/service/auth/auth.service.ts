import jwt_decode from 'jwt-decode';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/model/Auth';
import { UserLogin } from 'src/app/model/Login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dataAtual: Date = new Date();
  segundosDataAtual: number = Math.floor(this.dataAtual.getTime() / 1000);

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  fazerLogin(login: UserLogin): Observable<Auth> {
    return this.httpClient.post<Auth>('/api/condomanager/sistema/login', login);
  }

  autenticar() {
    var decodeToken = this.getDecodeToken(this.recuperarToken());

    if(decodeToken.exp > this.segundosDataAtual && decodeToken != '') {
      return true;
    }

    return false;
  }

  getDecodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return '';
    }
  }

  recuperarToken(): string {
    var token  = localStorage.getItem('accessToken');
    if(token != null) {
      return token;
    }

    return '';
  }

  fazLogout() {
    localStorage.clear();
    this.router.navigate(['condomanager/login']);
  }
}
