import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, delay, tap} from 'rxjs/operators';

export interface Options {
  cost_update_delay: number;
  bidding_time_period: number;
}

@Injectable({providedIn: 'root'})
export class OptionsService {

  constructor(private http: HttpClient) {}

  private serverUrl = 'http://localhost:4201/options/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    return throwError('Try again');
  }
  editStock(item: Options): Observable<Options> {
    return this.http.post<Options>(this.serverUrl + 'edit', item, this.httpOptions)
        .pipe(
            delay(100),
            catchError(this.handleError)
        );
  }

}
