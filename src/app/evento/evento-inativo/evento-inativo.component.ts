import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-evento-inativo',
  templateUrl: './evento-inativo.component.html'
})
export class EventoInativoComponent implements OnInit {

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
      ativo: [false],
    });

    this.service.get().subscribe(resp => {
      if (resp.data) {
        this.eventos = resp.data.filter(c => +c.ativo === 0);
      }
    });
  }

  active(id: number) {
    const data = {
      id: this.formData.controls['id'].value,
      ativo: this.formData.controls['ativo'].value ? 1 : 0
    };
    this.service.active(id).subscribe(res => {
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
