import { UserLogin } from 'src/app/model/Login';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/suth/auth.service';
import { Auth } from 'src/app/model/Auth';
import { Acesso } from 'src/app/model/Acesso';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: UserLogin = {
    email: "",
    password: ""
  };

  acesso: Acesso = {
    nivel: "",
    accessToken: ""
  };

  auth: Auth = {
    acesso: this.acesso
  }

  constructor(
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.autenticar(this.login).subscribe(
      (res) => {
        this.auth = res;
        alert("Usuário logado com suceeso NIVEL: "+this.auth.acesso.nivel);
      },
      (httpError) => {
        alert(httpError.error.mensagem);
        console.log(httpError);
      }
    );
  }

  onError(errorMsg: string) {
    alert(errorMsg);
  }

}
