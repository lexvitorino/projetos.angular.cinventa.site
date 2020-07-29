import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InscricaoService } from '../../inscricao/inscricao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  formData: FormGroup;
  data: Inscricao;
  eventos: Evento[] = [];
  hasConjuge = false;
  hasEvento = false;
  hasCadeira = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: InscricaoService
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      id: [null],
      evento: ['', [Validators.required]],
      data: [{ value: '', disabled: true }, [Validators.required]],
      dataFmt: [{ value: '', disabled: true }],
      cadeira: [{ value: '', disabled: true }, [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      nome: [{ value: '', disabled: true }, [Validators.required]],
      conjuge: [''],
    });

    this.service.eventos().subscribe(resp => {
      if (resp.data) {
        this.eventos = resp.data;
      }
    });
  }

  onSubmit() {
    if (!this.formData.invalid) {
      if (this.formData.controls['evento'].value === '') {
        this.toastr.warning('Evento não preenchido!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['cadeira'].value === '') {
        this.toastr.warning('Cadeira não preenchida!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['data'].value === '') {
        this.toastr.warning('Data não preenchida!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['nome'].value === '') {
        this.toastr.warning('Nome não preenchida!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['cadeira'].value == 'Dupla' && this.formData.controls['conjuge'].value === '') {
        this.toastr.warning('Conjuge não preenchida!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['email'].value === '') {
        this.toastr.warning('E-mail não preenchida!', 'Inscrições para os cultos!');
        return;
      }
    }

    const data = {
      evento: this.formData.controls['evento'].value,
      data: this.formData.controls['data'].value,
      cadeira: this.formData.controls['cadeira'].value,
      nome: this.formData.controls['nome'].value,
      conjuge: this.formData.controls['conjuge'].value,
      email: this.formData.controls['email'].value
    };

    this.service.create(data).subscribe(res => {
      if (res.message.hasError) {
        this.router.navigate(['/cadastro-erro']);
        this.toastr.warning(res.message.errors[0], 'Inscrições para os cultos!');
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

      const e = this.eventos.find(c => c.chave === (this.formData.controls['evento'].value));

      this.formData.controls['dataFmt'].setValue('');
      this.formData.controls['data'].setValue('');

      if (e) {
        const dataFmt = e.data.split('-');
        this.formData.controls['dataFmt'].setValue(`${dataFmt[2]}/${dataFmt[1]}/${dataFmt[0]}`);
        this.formData.controls['data'].setValue(e.data);
      }
    }

    this.formData.controls['cadeira'].disable();
    if (this.formData.controls['evento'].value !== '') {
      this.formData.controls['cadeira'].enable();
    }
  }

  onChangeCadeira() {
    if (this.formData.controls['cadeira'].value !== '') {
      this.hasCadeira = true;
    }
    this.hasConjuge = false;
    if (this.formData.controls['cadeira'].value === 'Dupla') {
      this.hasConjuge = true;
    }
    this.formData.controls['nome'].enable();
    this.formData.controls['email'].enable();
  }
}
