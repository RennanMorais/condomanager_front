import { UserLogin } from 'src/app/model/Login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/model/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  autenticar(login: UserLogin): Observable<Auth> {
    return this.httpClient.post<Auth>('/api/condomanager/sistema/login', login);
  }

}
