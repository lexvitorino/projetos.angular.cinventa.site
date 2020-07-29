import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisar-ok',
  templateUrl: './pesquisar-ok.component.html'
})
export class PesquisarOkComponent implements OnInit {
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
