import { Component, OnInit } from '@angular/core';
import {StocksService} from '../shared/stocks.service';
import {delay} from 'rxjs/operators';
import {ModalService} from '../shared/modals.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private stocksService: StocksService, private modalService: ModalService) { }

  private loading = true;

  ngOnInit() {
     this.stocksService.fetchStocks()
      .pipe(delay(5))
      .subscribe(() => {
        this.loading = false;
    });
  }

}
