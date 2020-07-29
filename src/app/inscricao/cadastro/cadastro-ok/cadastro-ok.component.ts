import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-ok',
  templateUrl: './cadastro-ok.component.html'
})
export class CadastroOkComponent implements OnInit {
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
