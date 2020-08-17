import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InscricaoService } from '../../inscricao/inscricao.service';
import { EventoService } from '../../evento/evento.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  formData: FormGroup;
  data: Inscricao;

  evento: Evento;
  eventos: Evento[] = [];
  eventoStatus = {
    ok: true,
    message: ''
  };

  hasConjuge = false;
  hasEvento = false;
  hasCadeira = false;
  hasIdade = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: InscricaoService,
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      id: [null],
      evento: ['', [Validators.required]],
      data: [{ value: '', disabled: true }, [Validators.required]],
      dataFmt: [{ value: '', disabled: true }],
      cadeira: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      nome: [{ value: '', disabled: true }, [Validators.required]],
      area: [{ value: '', disabled: true }, [Validators.required]],
      idade: [{ value: '', disabled: true }],
      conjuge: [''],
    });

    this.eventoService.getActivosToInc().subscribe(resp => {
      if (resp.data) {
        this.eventos = resp.data;
        this.eventoStatus.ok = resp.data.length > 0;
        this.eventoStatus.message = 'Incrições Encerradas';
      }
    });
  }

  onSubmit() {
    if (this.formData.invalid) {
      if (this.formData.controls['evento'].invalid) {
        this.toastr.error('Evento não preenchido!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['data'].invalid) {
        this.toastr.error('Data não preenchida!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['nome'].invalid) {
        this.toastr.error('Nome não preenchida!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['cadeira'].value === 'Dupla' && this.formData.controls['conjuge'].value === '') {
        this.toastr.error('Conjuge não preenchida!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['email'].invalid) {
        this.toastr.error('E-mail não preenchida ou inválido!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['area'].invalid) {
        this.toastr.error('Area não preenchida!', 'Inscrições para os cultos!');
        return;
      }
    }

    if ((+this.evento.sol_idade === 1) &&
      (this.formData.controls['idade'].value === '' || this.formData.controls['idade'].value === 0)) {
      this.toastr.error('Idade não preenchida!', 'Inscrições para os cultos!');
      return;
    }

    const data = {
      evento: this.formData.controls['evento'].value,
      data: this.formData.controls['data'].value,
      cadeira: this.formData.controls['cadeira'].value,
      nome: this.formData.controls['nome'].value,
      conjuge: this.formData.controls['conjuge'].value,
      email: this.formData.controls['email'].value,
      area: this.formData.controls['area'].value,
      idade: this.formData.controls['idade'].value
    };

    this.service.create(data).subscribe(res => {
      if (res.message.hasError) {
        this.router.navigate(['/cadastro-erro']);
        localStorage.setItem('insc.data', JSON.stringify(res.message));
      } else {
        this.router.navigate(['/cadastro-ok']);
        localStorage.setItem('insc.data', JSON.stringify(res.data));
      }
    });
  }

  onChangeEvento() {
    this.hasEvento = false;
    if (this.formData.controls['evento'].value !== '') {
      this.hasEvento = true;

      this.evento = this.eventos.find(c => c.chave === (this.formData.controls['evento'].value));

      this.formData.controls['dataFmt'].setValue('');
      this.formData.controls['data'].setValue('');

      if (this.evento) {
        const dataFmt = this.evento.data.split('-');
        this.formData.controls['dataFmt'].setValue(`${dataFmt[2]}/${dataFmt[1]}/${dataFmt[0]}`);
        this.formData.controls['data'].setValue(this.evento.data);
      }
    }

    this.formData.controls['cadeira'].setValue('');
    this.formData.controls['cadeira'].disable();
    if (this.formData.controls['evento'].value !== '') {
      this.formData.controls['cadeira'].enable();
    }

    this.hasIdade = false;
    this.hasConjuge = false;
    this.hasCadeira = false;
  }

  onChangeCadeira() {
    if (this.formData.controls['cadeira'].value !== '') {
      this.hasCadeira = true;
    }
    this.hasConjuge = false;
    if (this.formData.controls['cadeira'].value === 'Dupla') {
      this.hasConjuge = true;
    }

    this.hasIdade = false;
    if (+this.evento.sol_idade === 1) {
      this.hasIdade = true;
    }

    if (this.formData.controls['cadeira'].value === 'Simples') {
      if (+this.evento.dispSimples <= 0) {
        this.eventoStatus.ok = false;
        this.eventoStatus.message = `Não existe mais vagas disponíveis para cadeira ${this.formData.controls['cadeira'].value}`;
      }
    } else if (this.formData.controls['cadeira'].value === 'Dupla') {
      if (+this.evento.dispDupla <= 0) {
        this.eventoStatus.ok = false;
        this.eventoStatus.message = `Não existe mais vagas disponíveis para cadeira ${this.formData.controls['cadeira'].value}`;
      }
    }

    this.formData.controls['nome'].enable();
    this.formData.controls['email'].enable();
    this.formData.controls['area'].enable();
    this.formData.controls['idade'].enable();
  }
}
