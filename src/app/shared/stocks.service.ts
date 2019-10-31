import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, delay, tap} from 'rxjs/operators';

export interface Stock {
  id: number;
  company: string;
  number: number;
  distribution: string;
  start_price: number;
}

@Injectable({providedIn: 'root'})
export class StocksService {

  constructor(private http: HttpClient) {}

  public stocks: Stock[] = [];
  private serverUrl = 'http://localhost:4201/securities/';
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

  fetchStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.serverUrl)
      .pipe(
          delay(100),
          tap((stocks) => this.stocks = stocks),
      );
  }

  removeStock(stkID: number): Observable<Stock> {
    const data = {id: stkID};
    return this.http.post<Stock>(this.serverUrl + 'del', data, this.httpOptions)
        .pipe(
            delay(100),
            catchError(this.handleError)
        );
  }

  addStock(item: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.serverUrl + 'add', item, this.httpOptions)
        .pipe(
            delay(100),
            catchError(this.handleError)
        );
  }

  editStock(item: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.serverUrl + 'edit', item, this.httpOptions)
        .pipe(
            delay(100),
            catchError(this.handleError)
        );
  }

}
