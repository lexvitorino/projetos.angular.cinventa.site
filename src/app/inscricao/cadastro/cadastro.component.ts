import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InscricaoService } from '../../inscricao/inscricao.service';
import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formData: FormGroup;
  stage: number;
  lbButton: string;
  data: Inscricao;
  qrcodename: string;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  href: string;
  datas: any[] = [];
  eventoModel: EventoModel;
  eventos: any[] = [];
  pessoas: any[] = [];
  areas: any[] = [];
  supervisores: any[] = [];
  lideres: any[] = [];
  baseUrl: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: InscricaoService
  ) { }

  ngOnInit() {
    this.baseUrl = environment.base_url;
    this.stage = 1;
    this.lbButton = 'Próximo';
    this.formData = this.formBuilder.group({
      id: [null],
      evento: ['', [Validators.required]],
      data: ['', [Validators.required]],
      cadeira: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      conjuge: [''],
      area: ['', [Validators.required]],
      supervisor: [''],
      lider: [''],
    });

    this.service.getEvents().subscribe(resp => {
      if (resp.data) {
        this.eventoModel = resp;
        resp.data.forEach((e: Evento) => {
          if (this.datas.findIndex(dt => dt.id === e.data) < 0) {
            const f = e.data.split('-');
            const c = { id: e.data, value: `${f[2]}/${f[1]}/${f[0]}` };
            this.datas.push(c);
          }
          this.formData.controls['data'].setValue(this.datas[0]['id']);
          this.getEventos();
        });
      }
    });

    this.service.pessoas().subscribe(resp => {
      resp.forEach((e: any) => {
        const c = e.campo.split(' - ');
        this.pessoas.push(
          {
            area: c[0],
            supervisor: c[1],
            dirigente: c[2]
          }
        );
        if (this.areas.findIndex(x => x === c[0]) < 0) {
          this.areas.push(c[0]);
        }
      });
    });
  }

  vagasValidas() {
    this.data = Object.assign({}, this.data, this.formData.value);
    return new Promise((resolve, reject) => {
      this.service.vagasValidas(this.data.evento, this.data.data, this.data.cadeira).subscribe(res => {
        if (res.message.hasError) {
          this.toastr.info(res.message.errors[0], 'Inscrições para os cultos!');
          this.stage = 1;
          this.lbButton = 'Próximo';
        }
        resolve(res.message.hasError);
      });
    });
  }

  async isValidaEmailExiste() {
    const c = await this.validaEmailExiste();
    return c;
  }

  validaEmailExiste() {
    this.data = Object.assign({}, this.data, this.formData.value);
    return new Promise((resolve, reject) => {
      this.service.byEventoAndDataAndEmail(this.data.evento, this.data.data, this.data.email).subscribe(res => {
        if (!res.message.hasError) {
          if (res.data[0].id > 0) {
            this.toastr.info('Já existe inscrição para o evento informado', 'Inscrições para os cultos!');
            this.setValues(res.data[0]);
            this.stage = 4;
            this.lbButton = 'Salvar';
            resolve(true);
          }
        }
        resolve(false);
      });
    });
  }

  async next() {
    this.data = Object.assign({}, this.data, this.formData.value);
    switch (this.stage) {
      case 1: {
        if (!this.data.evento || this.data.evento === '') {
          this.toastr.warning('Encontro não informado', 'Inscrições para os cultos!');
          return;
        } else if (!this.data.data || this.data.data === '') {
          this.toastr.warning('Data não informado', 'Inscrições para os cultos!');
          return;
        } else if (!this.data.cadeira || this.data.cadeira === '') {
          this.toastr.warning('Cadeira não informado', 'Inscrições para os cultos!');
          return;
        }
        if (await this.vagasValidas()) {
          return;
        }
        this.lbButton = 'Próximo';
        this.stage++;
        break;
      }
      case 2: {
        if (!this.data.email || this.data.email === '' || this.formData.controls['email'].invalid) {
          this.toastr.warning('E-mail não informado ou inválido', 'Inscrições para os cultos!');
          return;
        } else if (!this.data.nome || this.data.nome === '') {
          this.toastr.warning('Nome não informado', 'Inscrições para os cultos!');
          return;
        } else if (!this.data.sobrenome || this.data.sobrenome === '') {
          this.toastr.warning('Sobrenome não informado', 'Inscrições para os cultos!');
          return;
        }
        const result = await this.validaEmailExiste();
        if (result) {
          return;
        }
        this.lbButton = 'Salvar';
        this.stage++;
        break;
      }
      case 3: {
        if (!this.data.area || this.data.area === '') {
          this.toastr.warning('Área não informado', 'Inscrições para os cultos!');
          return;
        }
        /*} else if (!this.data.supervisor || this.data.supervisor === '') {
          this.toastr.warning('Supervisor não informado', 'Inscrições para os cultos!');
          return;
        } else if (!this.data.lider || this.data.lider === '') {
          this.toastr.warning('Lider não informado', 'Inscrições para os cultos!');
          return;
        }*/
        this.onSubmit();
        break;
      }
      case 4: {
        this.salvar();
        this.lbButton = 'Nova Inscrição';
        this.stage++;
        break;
      }
      case 5: {
        this.lbButton = 'Próximo';
        this.stage = 1;
        this.formData.patchValue({
          id: null,
          email: '',
          nome: '',
          cadeira: '',
          sobrenome: '',
          conjuge: '',
          area: '',
          supervisor: '',
          lider: ''
        });
        break;
      }
    }
  }

  first() {
    this.stage = 1;
    this.lbButton = 'Próximo';
  }

  salvar() {
    localStorage.setItem(environment.prefix + '.inscicao', this.value);
    this.toastr.info('Ótimo... quando entrar novamente irá trazer esse QRCode.', 'Inscrições para os cultos!');
  }

  onSubmit() {
    if (!this.formData.invalid) {
      this.data = Object.assign({}, this.data, this.formData.value);
      this.service.create(this.data).subscribe(res => {
        if (res.message.hasError) {
          this.toastr.warning(res.message.errors[0], 'Inscrições para os cultos!');
          return;
        } else {
          this.setValues(res.data);
          this.lbButton = 'Salvar';
          this.stage++;
        }
      });
    }
  }

  setValues(data: Inscricao) {
    this.data = data;
    this.formData.patchValue(data);
    this.formData.controls['id'].setValue(+data.id);
    this.value = JSON.stringify(data);
  }

  public onAreaChange() {
    this.formData.controls['supervisor'].setValue('');
    this.formData.controls['lider'].setValue('');
    this.supervisores = [];
    this.lideres = [];
    this.supervisores.push('N/I');
    this.supervisores.push('Sou área');
    this.pessoas.filter(c => c.area === this.formData.controls['area'].value).forEach(e => {
      if (this.supervisores.findIndex(x => x === e.supervisor) < 0) {
        this.supervisores.push(e.supervisor);
      }
    });
  }

  public onAreaSupervisor() {
    this.formData.controls['lider'].setValue('');
    this.lideres = [];
    this.lideres.push('Sou subervisor');
    this.pessoas.filter(c => c.supervisor === this.formData.controls['supervisor'].value).forEach(e => {
      this.lideres.push(e.dirigente);
    });
  }

  public getEventos() {
    this.eventos = [];
    this.formData.controls['evento'].setValue('');
    this.eventoModel.data.filter(c => c.data === this.formData.controls['data'].value).forEach(e => {
      this.eventos.push({ id: e.chave, value: e.descricao });
    });
  }
}
