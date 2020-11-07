import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InscricaoService } from '../../inscricao/inscricao.service';
import { ExcelUtils } from '../../shared/excel.util';
import { environment } from './../../../environments/environment';
import { Event } from '@angular/router';
import { EventoService } from '../../evento/evento.service';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.scss']
})
export class ExportarComponent implements OnInit {

  formData: FormGroup;
  eventos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: InscricaoService,
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      evento: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });

    this.eventoService.get().subscribe(resp => {
      if (resp.data) {
        if (!resp.message.hasError) {
          this.eventos = resp.data.filter((c: Evento) => +c.ativo === 1);
        }
      }
    });
  }

  public exportar() {

    const evento = this.eventos.find((c: Evento) => c.chave === this.formData.controls['evento'].value);
    if (!evento) {
      this.toastr.warning('Encontro não informado', 'Inscrições para os cultos!');
      return;
    }

    this.service.byEventoAndData(evento.chave, evento.data).subscribe(resp => {

      const dados = [];
      resp.data.map((r: Inscricao) => {

        const f = r.data.split('-');
        const dt = `${f[2]}/${f[1]}/${f[0]}`;

        dados.push({
          id: r.id,
          evento: r.evento,
          data: dt,
          periodo: r.periodo,
          cadeira: r.cadeira,
          email: r.email,
          nome: r.nome,
          sobrenome: r.sobrenome,
          conjuge: r.conjuge,
          acompanhante3: r.acompanhante3,
          acompanhante4: r.acompanhante4,
          area: r.area,
          confirmado: r.confirmado === '1' ? 'SIM' : 'NAO',
          idade: r.idade
        });
      });

      const headerDictionary = {
        id: 'ID',
        evento: 'Evento',
        data: 'Data',
        cadeira: 'Cadeira',
        periodo: 'Período',
        email: 'E-mail',
        nome: 'Nome',
        conjuge: 'Nome do par',
        acompanhante3: 'Acompanhante 3',
        acompanhante4: 'Acompanhante 4',
        confirmado: 'Confirmado',
        idade: 'Idade'
      };

      const options = {
        headerJsonKeys: true,
        headerDictionary
      };

      ExcelUtils.exportAsExcelFile(dados, evento.chave, options);
    });
  }
}
