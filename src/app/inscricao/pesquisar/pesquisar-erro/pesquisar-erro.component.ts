import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisar-erro',
  templateUrl: './pesquisar-erro.component.html'
})
export class PesquisarErroComponent implements OnInit {
  data: Inscricao;

  constructor(
  ) { }

  ngOnInit() {
    const d = localStorage.getItem('insc.data');
    if (d) {
      this.data = JSON.parse(d);
    }
  }
}
