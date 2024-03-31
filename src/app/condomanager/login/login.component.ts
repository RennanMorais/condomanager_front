import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Acesso } from 'src/app/model/Acesso';
import { Auth } from 'src/app/model/Auth';
import { CodigoVerificaRequest } from 'src/app/model/request/CodigoVerificacaoRequest';
import { UserLogin } from 'src/app/model/Login';
import { ResponseMensagem } from 'src/app/model/response/ResponseMensagem';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RedefinicaoSenhaRequest } from 'src/app/model/request/RedefinicaoSenhaRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: UserLogin = new UserLogin;
  codigoAcessoReq: CodigoVerificaRequest = new CodigoVerificaRequest;
  responseHttpErrors: ResponseMensagem[] = [];
  codigoacessoResponse: ResponseMensagem = new ResponseMensagem;
  responseHttpErro: ResponseMensagem = new ResponseMensagem;
  redefinicaoSenhaReq: RedefinicaoSenhaRequest = new RedefinicaoSenhaRequest;

  //boolean para mostrar campos
  hide: any = true;
  fieldRecuperaSenha: boolean = false;
  fieldCodAcesso: boolean = false;
  botaovalidar: boolean = false;
  botaoRedefinirSenha: boolean = false;

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
    console.log("INICIOU");
    console.log(this.responseHttpErrors);
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
          console.log(this.responseHttpErrors);
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

  gerarCodigoVerificacao() {
    this.authService.gerarCodVerificacao(this.codigoAcessoReq).subscribe(
      (res) => {
        this.codigoacessoResponse = res;
        if(res.codigo == '200') {
          this.botaovalidar = true;
          this.fieldCodAcesso = true;
        }
      },
      (httpError) => {
        this.responseHttpErro.mensagem = httpError.error.mensagem;
      }
    );
  }

  validarCodigoVerificacao() {
    this.redefinicaoSenhaReq.email = this.codigoAcessoReq.email;
    this.authService.validarCodigoVerificacao(this.codigoAcessoReq).subscribe(
      (res) => {
        this.codigoacessoResponse = res;
        if(res.codigo == '200') {
          this.botaovalidar = false;
          this.fieldRecuperaSenha = false;
          this.botaoRedefinirSenha = true;
        }
      },
      (httpError) => {
        this.responseHttpErro.mensagem = httpError.error.mensagem;
      }
    );
  }

  redefinirSenhaUsuario() {
    this.redefinicaoSenhaReq.email = this.codigoAcessoReq.email;
    this.authService.redefinirSenha(this.redefinicaoSenhaReq).subscribe(
      (res) => {
        this.codigoacessoResponse = res;
        if(res.codigo == '200') {
          this.botaoRedefinirSenha = false;
          this.router.navigate(['condomanager/sistema/login']);
        }
      },
      (httpError) => {
        this.responseHttpErro.mensagem = httpError.error.mensagem;
      }
    );
  }

  LigaDesligaCamposRecuperaSenha() {
    if(this.fieldRecuperaSenha) {
      this.fieldRecuperaSenha = false;
    } else {
      this.fieldRecuperaSenha = true;
    }
  }

}
