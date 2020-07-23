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

  public create(data: Inscricao): Observable<InscricaoModel> {
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

  public getEvents(): Observable<EventoModel> {
    return this.http
      .get<EventoModel>(`${environment.service_url}/event`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public pessoas(): Observable<any> {
    return this.http.get<any>(`assets/pessoas.json`);
  }

  public confirmar(id: number): Observable<InscricoesModel> {
    return this.http
      .put<InscricoesModel>(`${environment.service_url}/inscription/confirmar/`, { id })
      .pipe(
        catchError(ErrorService.handleError)
      );
  }

  public vagasValidas(chave, data, duplas): Observable<VagasValidasModel> {
    return this.http
      .get<VagasValidasModel>(`${environment.service_url}/inscription/vagasValidas/${chave}/${data}/${duplas}`)
      .pipe(
        catchError(ErrorService.handleError)
      );
  }
}
