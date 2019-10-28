import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

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

  public stocks: Stock[] = [
    {id: 1, company: 'fc', number: 23, distribution: 'dis', start_price: 5},
    {id: 2, company: 'sc', number: 32, distribution: 'dis2', start_price: 15}
  ];

  fetchStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>('http://localhost:4201/securities/')
      .pipe(tap((stocks) => this.stocks = stocks));
  }
}
