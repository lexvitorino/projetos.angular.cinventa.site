import { Component, OnInit, Input } from '@angular/core';
import { InscricaoService } from '../inscricao.service';

@Component({
  selector: 'app-encerrada',
  templateUrl: './encerrada.component.html'
})
export class EncerradaComponent implements OnInit {

  @Input() status = 'Inscrições encerradas';

  data: string;
  hora: string;

  constructor(
    private service: InscricaoService
  ) { }

  ngOnInit() {
    this.service.nextEvent().subscribe(resp => {
      if (!resp.message.hasError) {
        if (resp.data.proxEvento) {
          const dh = resp.data.proxEvento.split(' ');
          const d = dh[0].split('-');
          this.data = `${d[2]}/${d[1]}/${d[0]}`;
          this.hora = `${dh[1].substr(0, 2)}hs`;
        }
      }
    });
  }

}
