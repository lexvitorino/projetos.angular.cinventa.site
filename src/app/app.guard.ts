import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  constructor(
    private login: LoginService,
    private toastr: ToastrService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | boolean {
    return this.accessIsValid();
  }

  private accessIsValid() {
    if (this.login.isTokenExpired()) {
      this.toastr.info('Seu login foi revogado e será necessário fazer login novamente!');
      this.router.navigate(['/login']);
    }
    return true;
  }
}
