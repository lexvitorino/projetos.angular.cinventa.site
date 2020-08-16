import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventoService } from './evento.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html'
})
export class EventoComponent implements OnInit {

  formData: FormGroup;
  modalRef: BsModalRef;
  data: Evento;
  eventos: Evento[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: EventoService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      id: [null],
      chave: [''],
      ativo: [false],
      descricao: ['', [Validators.required]],
      dataFmt: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      simples: ['', [Validators.required]],
      dupla: ['', [Validators.required]],
      ativoAsFmt: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      inativoAsFmt: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      solIdade: [true],
    });

    this.service.get().subscribe(resp => {
      if (resp.data) {
        this.eventos = resp.data.filter(c => +c.ativo === 1);
      }
    });
  }

  create(template: TemplateRef<any>) {
    this.formData.controls['id'].setValue(null);
    this.formData.controls['chave'].setValue(null);
    this.formData.controls['descricao'].setValue(null);
    this.formData.controls['dataFmt'].setValue(null);
    this.formData.controls['simples'].setValue(null);
    this.formData.controls['dupla'].setValue(null);
    this.formData.controls['ativoAsFmt'].setValue(null);
    this.formData.controls['inativoAsFmt'].setValue(null);
    this.formData.controls['solIdade'].setValue(false);
    this.formData.controls['ativo'].setValue(true);
    this.modalRef = this.modalService.show(template);
  }

  edit(template: TemplateRef<any>, id: number) {
    this.data = this.eventos.find(c => +c.id === +id);
    if (!this.data) {
      this.toastr.error('Dados não encontrado', 'Evento para os encontros!');
    }
    this.formData.controls['id'].setValue(+id);
    this.formData.controls['chave'].setValue(this.data.chave);
    this.formData.controls['descricao'].setValue(this.data.descricao);
    this.formData.controls['dataFmt'].setValue(this.data.dataFmt);
    this.formData.controls['simples'].setValue(this.data.simples);
    this.formData.controls['dupla'].setValue(this.data.dupla);
    this.formData.controls['ativoAsFmt'].setValue(this.data.ativoAsFmt);
    this.formData.controls['inativoAsFmt'].setValue(this.data.inativoAsFmt);
    this.formData.controls['solIdade'].setValue((+this.data.sol_idade === 1) ? true : false);
    this.formData.controls['ativo'].setValue((+this.data.ativo === 1) ? true : false);
    this.modalRef = this.modalService.show(template);
  }

  private closeAllModals() {
    for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
      this.modalService.hide(i);
    }
  }

  onSubmit() {
    if (this.formData.invalid) {
      if (this.formData.controls['descricao'].invalid) {
        this.toastr.error('Descrição não preenchido!', 'Evento para os encontros!');
        return;
      } else if (this.formData.controls['dataFmt'].invalid) {
        this.toastr.error('Data não preenchida!', 'Evento para os encontros!');
        return;
      } else if (this.formData.controls['simples'].invalid) {
        this.toastr.error('Simples não preenchida!', 'Evento para os encontros!');
        return;
      } else if (this.formData.controls['dupla'].invalid) {
        this.toastr.error('Dupla não preenchida!', 'Evento para os encontros!');
        return;
      } else if (this.formData.controls['ativoAsFmt'].invalid) {
        this.toastr.error('Ativo as não preenchida!', 'Evento para os encontros!');
        return;
      } else if (this.formData.controls['inativoAsFmt'].invalid) {
        this.toastr.error('Inativo as não preenchida!', 'Evento para os encontros!');
        return;
      }
    }

    const data = {
      id: this.formData.controls['id'].value,
      chave: this.formData.controls['chave'].value,
      descricao: this.formData.controls['descricao'].value,
      dataFmt: this.formData.controls['dataFmt'].value,
      simples: this.formData.controls['simples'].value,
      dupla: this.formData.controls['dupla'].value,
      ativoAsFmt: this.formData.controls['ativoAsFmt'].value,
      inativoAsFmt: this.formData.controls['inativoAsFmt'].value,
      sol_idade: this.formData.controls['solIdade'].value ? 1 : 0,
      ativo: this.formData.controls['ativo'].value ? 1 : 0
    };

    this.service.save(data).subscribe(res => {
      if (res.message.hasError) {
        this.toastr.error(res.message.errors[0], 'Evento para os encontros!');
        return;
      }
      if (!data.id || data.id == null && data.id === 0) {
        this.eventos.push(res.data);
      } else {
        const idx = this.eventos.findIndex(e => +e.id === +data.id);
        if (!(idx < 0)) {
          if (+res.data.ativo === 0) {
            this.eventos.splice(idx, 1);
          } else {
            this.eventos[idx] = res.data;
          }
        }
      }
      this.closeAllModals();
    });
  }

  delete(id: number) {
    if (!(id > 0)) {
      this.toastr.error('ID não informado', 'Evento para os encontros!');
      return;
    }
    this.service.delete(id).subscribe(res => {
      if (res.message.hasError) {
        this.toastr.error(res.message.errors[0], 'Evento para os encontros!');
        return;
      }
      const idx = this.eventos.findIndex(e => +e.id === +id);
      if (!(idx < 0)) {
        this.eventos.splice(idx, 1);
      }
    });
  }
}
