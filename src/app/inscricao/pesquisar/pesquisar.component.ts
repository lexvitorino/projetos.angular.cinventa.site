import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InscricaoService } from '../inscricao.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html'
})
export class PesquisarComponent implements OnInit {

  formData: FormGroup;
  data: Inscricao;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: InscricaoService
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      ativo: [{ value: 1 }],
    });
  }

  onSubmit() {
    if (this.formData.invalid) {
      if (this.formData.controls['email'].value !== '') {
        this.toastr.warning('E-mail não informado ou inválido!', 'CG Ermelino');
        return;
      }
    }

    this.data = Object.assign({}, this.data, this.formData.value);
    this.service.byEmail(this.data).subscribe(res => {
      if (res.message.hasError) {
        this.router.navigate(['/pesquisar-erro']);
        localStorage.setItem('insc.data', JSON.stringify(this.data));
      } else {
        this.router.navigate(['/pesquisar-ok']);
        localStorage.setItem('insc.data', JSON.stringify(res.data));
      }
    });
  }
}
