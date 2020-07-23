import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InscricaoService } from '../../inscricao/inscricao.service';
import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.scss']
})
export class PesquisarComponent implements OnInit {

  formData: FormGroup;
  data: Inscricao;
  qrcodename: string;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  href: string;
  datas: any[] = [];
  eventoModel: EventoModel;
  eventos: any[] = [];
  stage: number;
  lbButton: string;
  baseUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: InscricaoService
  ) { }

  ngOnInit() {
    this.baseUrl = environment.base_url;
    const c = localStorage.getItem(environment.prefix + '.inscicao');
    if (c) {
      this.value = c;
      this.stage = 2;
      this.lbButton = 'Salvar';
      this.data = JSON.parse(c);
    } else {
      this.stage = 1;
      this.lbButton = 'Pesquisar';
    }

    this.formData = this.formBuilder.group({
      evento: ['', [Validators.required]],
      data: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.service.getEvents().subscribe(resp => {
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

  next() {
    if (this.stage === 1) {
      this.data = Object.assign({}, this.data, this.formData.value);
      if (!this.data.evento || this.data.evento === '') {
        this.toastr.warning('Encontro não informado', 'Inscrições para os cultos!');
        return;
      } else if (!this.data.evento || this.data.evento === '') {
        this.toastr.warning('Encontro não informado', 'Inscrições para os cultos!');
        return;
      } else if (!this.data.email || this.data.email === '' || this.formData.controls['email'].invalid) {
        this.toastr.warning('E-mail não informado ou inválido', 'Inscrições para os cultos!');
        return;
      }
      this.service.byEventoAndDataAndEmail(this.data.evento, this.data.data, this.data.email).subscribe(res => {
        if (res.message.hasError) {
          this.toastr.warning(res.message.errors[0], 'Inscrições para os cultos!');
          return;
        } else {
          if (res.data.id > 0) {
            this.data = res.data;
            this.value = JSON.stringify(res.data);
            this.lbButton = 'Salvar QRCode';
            this.stage = 2;
          }
        }
      });
    } else {
      localStorage.setItem(environment.prefix + '.inscicao', this.value);
      this.toastr.info('Ótimo... quando entrar novamente irá trazer esse QRCode.', 'Inscrições para os cultos!');
    }
  }

  first() {
    this.stage = 1;
    this.lbButton = 'Pesquisar';
    localStorage.removeItem(environment.prefix + '.inscicao');
  }

  public getEventos() {
    this.eventos = [];
    this.formData.controls['evento'].setValue('');
    this.eventoModel.data.filter(c => c.data === this.formData.controls['data'].value).forEach(e => {
      this.eventos.push({ id: e.chave, value: e.descricao });
    });
  }
}
