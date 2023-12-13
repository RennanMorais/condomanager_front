import { CodigoVerificaRequest } from '../../model/request/CodigoVerificacaoRequest';
import jwt_decode from 'jwt-decode';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/model/Auth';
import { UserLogin } from 'src/app/model/Login';
import { Router } from '@angular/router';
import { ResponseMensagem } from 'src/app/model/response/ResponseMensagem';
import { RedefinicaoSenhaRequest } from 'src/app/model/request/RedefinicaoSenhaRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  segundosDataAtual: number = Math.floor(new Date().getTime() / 1000);

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  fazerLogin(login: UserLogin): Observable<Auth> {
    return this.httpClient.post<Auth>('/api/condomanager/sistema/login', login);
  }

  gerarCodVerificacao(req: CodigoVerificaRequest):  Observable<ResponseMensagem>{
    return this.httpClient.post<ResponseMensagem>('/api/condomanager/sistema/login/recuperar/senha', req);
  }

  validarCodigoVerificacao(req: CodigoVerificaRequest):  Observable<ResponseMensagem>{
    return this.httpClient.post<ResponseMensagem>('/api/condomanager/sistema/login/recuperar/validar/codigo', req);
  }

  redefinirSenha(req: RedefinicaoSenhaRequest):  Observable<ResponseMensagem>{
    return this.httpClient.post<ResponseMensagem>('/api/condomanager/sistema/login/redefinir/senha', req);
  }

  autenticar() {
    var decodeToken = this.getDecodeToken(this.recuperarToken());

    if(decodeToken.exp >= this.segundosDataAtual && decodeToken != '') {
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
