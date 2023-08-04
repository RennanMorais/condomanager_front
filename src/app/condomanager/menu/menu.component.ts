import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  host: string = "http://localhost:4200";

  constructor(private authService: AuthService, private router: Router) {

  }

  logout() {
    this.authService.fazLogout();
  }

  redirecionadorMenu(rota: string) {
    this.router.navigate([rota]);
  }

}
