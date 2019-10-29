import { Component, OnInit } from '@angular/core';
import {StocksService} from '../shared/stocks.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private stocksService: StocksService) { }

  private loading = true;

  ngOnInit() {
    // TODO: Сделать Cors
     this.stocksService.fetchStocks()
      .pipe(delay(5))
      .subscribe(() => {
        this.loading = false;
    });
  }

}
