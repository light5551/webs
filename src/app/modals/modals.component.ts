import { Component, OnInit } from '@angular/core';
import {ModalService} from '../shared/modals.service';
import {Stock, StocksService} from '../shared/stocks.service';
import {Member, MembersService} from '../shared/members.service';
import {Options, OptionsService} from "../shared/options.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {

  constructor(private modalService: ModalService, private stocksService: StocksService, private memService: MembersService,
              private optService: OptionsService) { }

  public currentId: number = null;
  public services = [
      {
          f: this.addMember,
          service: this.memService
      },
      {
          f: this.addStock,
          service: this.stocksService
      },
      {
          f: this.editOptions,
          service: this.optService
      },
      {
          f: this.editStock,
          service: this.stocksService
      },
  ];

  ngOnInit() {
  }

  getInfoLabel(id: string) {
      return document.getElementById(id);
  }

  addStock(service: StocksService, data: Stock) {
     service.addStock(data)
        .subscribe(() => {
          service.fetchStocks()
              .subscribe();
        });
  }
  addMember(service: MembersService, data: Member) {
      service.addMember(data)
          .subscribe(() => {
              service.fetchMembers()
                 .subscribe();
          });
  }
    editStock(service: StocksService, data: Stock) {
        service.editStock(data)
            .subscribe(() => {
                service.fetchStocks()
                    .subscribe();
            });
    }
    editOptions(service: OptionsService, data: Options) {
        service.editStock(data)
            .subscribe(() => {
            });
    }
    getCurrentStock() {
      const id = this.modalService.getId();
      for (const el of this.stocksService.stocks) {
          if (el.id == id) {
              return el;
          }
      }
    }
}
