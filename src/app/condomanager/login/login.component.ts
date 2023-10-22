import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Acesso } from 'src/app/model/Acesso';
import { Auth } from 'src/app/model/Auth';
import { UserLogin } from 'src/app/model/Login';
import { ResponseMensagem } from 'src/app/model/response/ResponseMensagem';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: UserLogin = new UserLogin;
  responseHttpErrors: ResponseMensagem[] = [];

  public auth: Auth = {
    acesso: new Acesso
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // }

  ngOnInit(): void {
    if(this.authService.autenticar()) {
      this.router.navigate(['condomanager/sistema']);
    }
  }

  onLogin() {
    this.authService.fazerLogin(this.login).subscribe(
      (res) => {
        this.auth = res;
        localStorage.setItem('nivel', 'Nivel: '+this.auth.acesso?.nivel);
        localStorage.setItem('accessToken', 'Bearer '+this.auth.acesso?.accessToken);
        this.router.navigate(['condomanager/sistema']);
      },
      (httpError) => {
        var responseHttpErro: ResponseMensagem = new ResponseMensagem();
        if(Array.isArray(httpError.error.erros)) {
          this.responseHttpErrors = httpError.error.erros;
        } else {
          responseHttpErro.mensagem = httpError.error.mensagem;
          if(httpError.error.mensagem == null) {
            responseHttpErro.mensagem = httpError.statusText;
          }
          this.responseHttpErrors = [];
          this.responseHttpErrors.push(responseHttpErro);
        }
      }
    );
  }

}
