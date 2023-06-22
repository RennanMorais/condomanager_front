import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-condominio',
  templateUrl: './condominio.component.html',
  styleUrls: ['./condominio.component.scss']
})
export class CondominioComponent implements OnInit {

  listaNomes: string[]  = ["Nome1", 'Nome2', 'Nome3', 'Nome4'];

  constructor() { }

  ngOnInit(): void {
  }


}
