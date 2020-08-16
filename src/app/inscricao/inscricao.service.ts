import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorService } from '../app.error';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {

  constructor(
    private http: HttpClient
  ) {
  }

  public create(data: any): Observable<any> {
    return this.http
      .post<any>(`${environment.service_url}/inscription/create`, data)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public byEventoAndDataAndEmail(evento: string, data: string, email: string): Observable<any> {
    return this.http
      .get<any>(`${environment.service_url}/inscription/byEventoAndDataAndEmail/${evento}/${data}/${email}`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public byEventoAndData(evento: string, data: string): Observable<any> {
    return this.http
      .get<any>(`${environment.service_url}/inscription/byEventoAndData/${evento}/${data}`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public eventos(): Observable<any> {
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

  public confirmar(id: number): Observable<any> {
    return this.http
      .put<any>(`${environment.service_url}/inscription/confirmar/`, { id })
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public byEmail(data: any): Observable<any> {
    return this.http
      .get<any>(`${environment.service_url}/inscription/byEmail/${data.email}/${data.ativo ? 1 : 0}`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }
}
