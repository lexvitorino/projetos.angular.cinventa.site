import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { InscricaoService } from '../inscricao/inscricao.service';

@Component({
  selector: 'app-confirma',
  templateUrl: './confirma.component.html',
  styleUrls: ['./confirma.component.scss']
})
export class ConfirmaComponent implements OnInit {

  formData: FormGroup;
  data: Inscricao;
  baseUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: InscricaoService
  ) { }

  ngOnInit() {
    this.baseUrl = environment.base_url;
    this.formData = this.formBuilder.group({
      id: [''],
    });
  }

  onSubmit() {
    if (!this.formData.controls['id'] || this.formData.controls['id'].value === 0 || this.formData.controls['id'].value === '') {
      this.toastr.warning('ID não informado', 'Inscrições para os cultos!');
      return;
    }
    this.service.confirmar(this.formData.controls['id'].value).subscribe(res => {
      if (res.message.hasError) {
        this.toastr.warning(res.message.errors[0], 'Inscrições para os cultos!');
        return;
      } else {
        this.toastr.success('Presença confirmada', 'Inscrições para os cultos!');
        this.formData.controls['id'].setValue('');
      }
    });
  }
}
