import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorService } from '../app.error';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
  }

  public save(data: any): Observable<any> {
    const bearer = 'Bearer ' + this.loginService.getToken();
    const headers = new HttpHeaders({ Authorization: bearer });

    if (data.id != null && data.id > 0) {
      return this.http
        .put<any>(`${environment.service_url}/event/${data.id}`, data, { headers })
        .pipe(
          catchError(ErrorService.handleError)
        );
    } else {
      return this.http
        .post<any>(`${environment.service_url}/event/create`, data, { headers })
        .pipe(
          catchError(ErrorService.handleError)
        );
    }
  }

  public delete(id: any): Observable<any> {
    const bearer = 'Bearer ' + this.loginService.getToken();
    const headers = new HttpHeaders({ Authorization: bearer });
    return this.http
      .delete<any>(`${environment.service_url}/event/${id}`, { headers })
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public active(id: any): Observable<any> {
    const bearer = 'Bearer ' + this.loginService.getToken();
    const headers = new HttpHeaders({ Authorization: bearer });
    return this.http
      .delete<any>(`${environment.service_url}/event/active/${id}`, { headers })
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public get(): Observable<any> {
    return this.http
      .get<any>(`${environment.service_url}/event`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public getActivosToInc(): Observable<any> {
    return this.http
      .get<any>(`${environment.service_url}/event/getActivosToInc`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public nextEvent(): Observable<any> {
    return this.http
      .get<any>(`${environment.service_url}/event/proximoEvento`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }
}
