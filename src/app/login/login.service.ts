import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorService } from '../app.error';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  public auth(email, password): Observable<AuthModel> {
    return this.http
      .post<AuthModel>(`${environment.service_url}/session/auth`, { email, password })
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public setToken(token): void {
    sessionStorage.setItem(`${environment.prefix}.token`, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(`${environment.prefix}.token`);
  }

  public getTokenExpirationDate(token: string): Date {
    const decoded = this.jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public jwtDecode(token: string) {
    return jwt_decode(token);
  }

  public isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }

    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  public logout() {
    sessionStorage.removeItem(`${environment.prefix}.token`);
    this.toastr.info('Até logo mais!!');
    this.router.navigate(['/login']);
  }
}
