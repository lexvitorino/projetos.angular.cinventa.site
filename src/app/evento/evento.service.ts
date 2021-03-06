import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorService } from '../app.error';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private http: HttpClient
  ) {
  }

  public save(data: any): Observable<any> {

    if (data.id != null && data.id > 0) {
      return this.http
        .put<any>(`${environment.service_url}/event/${data.id}`, data)
        .pipe(
          catchError(ErrorService.handleError)
        );
    } else {
      return this.http
        .post<any>(`${environment.service_url}/event/create`, data)
        .pipe(
          catchError(ErrorService.handleError)
        );
    }
  }

  public delete(id: any): Observable<any> {
    return this.http
      .delete<any>(`${environment.service_url}/event/${id}`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public active(id: any): Observable<any> {
    return this.http
      .delete<any>(`${environment.service_url}/event/active/${id}`)
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
