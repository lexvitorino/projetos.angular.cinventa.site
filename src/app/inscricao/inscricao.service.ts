import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from '../app.error';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {

  constructor(
    private http: HttpClient
  ) {
  }

  public create(data: any): Observable<InscricaoModel> {
    return this.http
      .post<InscricaoModel>(`${environment.service_url}/inscription/create`, data)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public byEventoAndDataAndEmail(evento: string, data: string, email: string): Observable<InscricaoModel> {
    return this.http
      .get<InscricaoModel>(`${environment.service_url}/inscription/byEventoAndDataAndEmail/${evento}/${data}/${email}`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public byEventoAndData(evento: string, data: string): Observable<InscricoesModel> {
    return this.http
      .get<InscricoesModel>(`${environment.service_url}/inscription/byEventoAndData/${evento}/${data}`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public eventos(): Observable<EventoModel> {
    return this.http
      .get<EventoModel>(`${environment.service_url}/event`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public confirmar(id: number): Observable<InscricoesModel> {
    return this.http
      .put<InscricoesModel>(`${environment.service_url}/inscription/confirmar/`, { id })
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public byEmail(data: any): Observable<InscricoesModel> {
    return this.http
      .get<InscricoesModel>(`${environment.service_url}/inscription/byEmail/${data.email}/${data.ativo ? 1 : 0}`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }
}
