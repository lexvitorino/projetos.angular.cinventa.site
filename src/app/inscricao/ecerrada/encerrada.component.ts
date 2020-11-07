import { Component, Input, OnInit } from '@angular/core';
import { EventoService } from '../../evento/evento.service';

@Component({
  selector: 'app-encerrada',
  templateUrl: './encerrada.component.html'
})
export class EncerradaComponent implements OnInit {

  @Input() status = 'Inscrições encerradas';

  data: string;
  warning: string;
  hora: string;
  evento: string;

  constructor(
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    this.eventoService.nextEvent().subscribe(resp => {
      if (!resp.message.hasError) {
        this.evento = resp.data.descricao;
        if (resp.data.proxEvento) {
          const dh = resp.data.proxEvento.split(' ');
          const d = dh[0].split('-');
          this.data = `${d[2]}/${d[1]}/${d[0]}`;
          this.hora = `${dh[1].substr(0, 2)}hs`;
        }
      } else {
        this.warning = resp.message.errors[0];
      }
    });
  }

}
