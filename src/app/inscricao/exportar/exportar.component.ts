import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InscricaoService } from '../../inscricao/inscricao.service';
import { ExcelUtils } from '../../shared/excel.util';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.scss']
})
export class ExportarComponent implements OnInit {

  formData: FormGroup;
  data: Inscricao;
  datas: any[] = [];
  eventoModel: EventoModel;
  eventos: any[] = [];
  baseUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: InscricaoService
  ) { }

  ngOnInit() {
    this.baseUrl = environment.base_url;

    this.formData = this.formBuilder.group({
      evento: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });

    this.service.eventos().subscribe(resp => {
      if (resp.data) {
        this.eventoModel = resp;
        resp.data.forEach((e: Evento) => {
          if (this.datas.findIndex(dt => dt.id === e.data) < 0) {
            const f = e.data.split('-');
            const x = { id: e.data, value: `${f[2]}/${f[1]}/${f[0]}` };
            this.datas.push(x);
          }
          this.formData.controls['data'].setValue(this.datas[0]['id']);
          this.getEventos();
        });
      }
    });
  }

  public getEventos() {
    this.eventos = [];
    this.formData.controls['evento'].setValue('');
    this.eventoModel.data.filter(c => c.data === this.formData.controls['data'].value).forEach(e => {
      this.eventos.push({ id: e.chave, value: e.descricao });
    });
  }

  public exportar() {
    this.data = Object.assign({}, this.data, this.formData.value);

    if (!this.data.evento || this.data.evento === '') {
      this.toastr.warning('Encontro não informado', 'Inscrições para os cultos!');
      return;
    }

    this.service.byEventoAndData(this.data.evento, this.data.data).subscribe(resp => {

      const dados = [];
      resp.data.map((r: Inscricao) => {

        const f = r.data.split('-');
        const dt = `${f[2]}/${f[1]}/${f[0]}`;

        dados.push({
          id: r.id,
          evento: r.evento,
          data: dt,
          cadeira: r.cadeira,
          email: r.email,
          nome: r.nome,
          sobrenome: r.sobrenome,
          conjuge: r.conjuge,
          area: r.area,
          confirmado: r.confirmado === '1' ? 'SIM' : 'NAO'
        });
      });

      const headerDictionary = {
        id: 'ID',
        evento: 'Evento',
        data: 'Data',
        cadeira: 'Cadeira',
        email: 'E-mail',
        nome: 'Nome',
        conjuge: 'Nome do par',
        confirmado: 'Confirmado'
      };

      const options = {
        headerJsonKeys: true,
        headerDictionary
      };

      ExcelUtils.exportAsExcelFile(dados, this.data.evento, options);
    });
  }
}
