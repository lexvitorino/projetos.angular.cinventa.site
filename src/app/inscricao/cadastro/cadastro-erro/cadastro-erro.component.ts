import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-erro',
  templateUrl: './cadastro-erro.component.html'
})
export class CadastroErroComponent implements OnInit {
  message: Message;

  constructor(
  ) { }

  ngOnInit() {
    const d = localStorage.getItem('insc.data');
    if (d) {
      this.message = JSON.parse(d);
    }
  }
}
