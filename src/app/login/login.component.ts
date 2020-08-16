import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formData: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formData.invalid) {
      if (this.formData.controls['email'].invalid) {
        this.toastr.error('E-mail não preenchida ou inválido!', 'Inscrições para os cultos!');
        return;
      } else if (this.formData.controls['password'].invalid) {
        this.toastr.error('Password não preenchida ou inválido!', 'Inscrições para os cultos!');
        return;
      }
    }

    const email = this.formData.controls['email'].value;
    const password = this.formData.controls['password'].value;

    this.loginService.auth(email, password).subscribe(resp => {
      if (!resp.message.hasError) {
        this.loginService.setToken(resp.data.token);

        this.toastr.success('Seja bem vindo de volta!');
        this.router.navigate(['/painel']);
      }
    });
  }
}
