import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  host: string = "http://localhost:4200";

  constructor(private router: Router) {

  }

  redirecionadorMenu(rota: string) {
    this.router.navigate([rota]);
  }

}
