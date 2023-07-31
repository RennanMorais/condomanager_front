
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/model/Auth';
import { UserLogin } from 'src/app/model/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  autenticar(login: UserLogin): Observable<Auth> {
    return this.httpClient.post<Auth>('/api/condomanager/sistema/login', login);
  }

}
