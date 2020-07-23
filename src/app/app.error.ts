import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorService {

  static handleError(error: HttpErrorResponse | any) {
    let errorMessage: string;
    if (error.status === 500) {
      errorMessage = 'Servidor não vinculado';
      console.log(error);
    } else if (error.error instanceof ErrorEvent) {
      const body = error || '';
      const err = body.error.message || JSON.stringify(body);
      errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${err}`;
    } else if (error.error) {
      const body = error || '';
      if (error.error.error_description) {
        errorMessage = error.error.error_description;
      } else {
        errorMessage = error.error.error;
      }
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.error) {
      errorMessage = error.error;
    } else {
      errorMessage = error;
    }

    return throwError(errorMessage);
  }
}
