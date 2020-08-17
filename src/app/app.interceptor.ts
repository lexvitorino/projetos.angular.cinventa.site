import {
  HttpHandler,
  HttpHeaderResponse,
  HttpHeaders,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login/login.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<| HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>> {

    const loginService = this.injector.get(LoginService);

    const bearer = 'Bearer ' + loginService.getToken();
    const headers = new HttpHeaders({
      Authorization: bearer
    });

    let cloneReq: any = null;

    let hasToken = true;
    const ignoreURLs = [];

    ignoreURLs.findIndex(c => {
      if (req.url.indexOf(c) >= 0) {
        hasToken = false;
        return;
      }
    });

    cloneReq = hasToken ? req.clone({ headers }) : req.clone();

    if (loginService.getToken()) {
      if (loginService.isTokenExpired()) {
        this.router.navigate(['/login']);
        return EMPTY;
      }

      return next.handle(cloneReq).pipe(catchError(err => {
        if (err.status === 401) {
          loginService.logout();
          this.router.navigate(['/login']);
        } else if (err.status === 400) {
          this.toastr.success('Seja bem vindo de volta!');
        }
        return throwError(err);
      }));
    } else {
      return next.handle(req).pipe(catchError(err => {
        return throwError(err);
      }));
    }
  }
}
