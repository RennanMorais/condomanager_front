import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Acesso } from 'src/app/model/Acesso';
import { Auth } from 'src/app/model/Auth';
import { UserLogin } from 'src/app/model/Login';
import { ResponseMensagem } from 'src/app/model/ResponseMensagem';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: UserLogin = new UserLogin;
  response: ResponseMensagem[] = [];
  responseHttp: ResponseMensagem = new ResponseMensagem;
  show: boolean = false;

  public auth: Auth = {
    acesso: new Acesso
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // }

  onLogin() {
    this.authService.fazerLogin(this.login).subscribe(
      (res) => {
        this.auth = res;
        localStorage.setItem('nivel', 'Nivel: '+this.auth.acesso?.nivel);
        localStorage.setItem('accessToken', 'Bearer '+this.auth.acesso?.accessToken);
        this.router.navigate(['condomanager/sistema']);
      },
      (httpError) => {
        this.response = httpError.error.erros;
        this.responseHttp.mensagem = httpError.error.mensagem;
        this.show = true;
      }
    );
  }

}
