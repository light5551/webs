import {ElementRef, Injectable, ViewChild} from '@angular/core';

export interface Field {
  id: string;
  labelText: string;
}

export interface Modal {
  id: string;
  title: string;
  fields: Field[];
  fun: any;
}


@Injectable({ providedIn: 'root' })
export class ModalService {
  public modals: Modal[] = [
    {id: 'addMember', title: 'Add member',
      fields:
        [
          {
            id: 'member_name',
            labelText: 'name'
          },
          {
            id: 'member_money',
            labelText: 'money'
          }
        ],
      fun: this.addMember
    },
    {id: 'addStock', title: 'Add stock',
      fields:
        [
          {
            id: 'stock_company',
            labelText: 'company'
          },
          {
            id: 'stock_count',
            labelText: 'stock_count'
          },
          {
            id: 'stock_distribution',
            labelText: 'distribution'
          },
          {
            id: 'stock_start_price',
            labelText: 'start_price'
          }
        ],
      fun: this.addStock

    },
    {id: 'exchangeOptions', title: 'Exchange options',
      fields:
        [
          {
            id: 'options_cost_update_delay',
            labelText: 'cost update delay'
          },
          {
            id: 'options_bidding_time_period',
            labelText: 'bidding time period'
          }
        ],
      fun: this.changeOptions
    }
  ];
  private memberName = document.getElementById('member_name');

  public addMember() {
      const name = (document.getElementById('member_name') as HTMLInputElement).value;
      const money = (document.getElementById('member_money') as HTMLInputElement).value;
      console.log(name, money);
  }

  public addStock() {
      const company = (document.getElementById('stock_company') as HTMLInputElement).value;
      const count = (document.getElementById('stock_count') as HTMLInputElement).value;
      const distribution = (document.getElementById('stock_distribution') as HTMLInputElement).value;
      const startPrice = (document.getElementById('stock_start_price') as HTMLInputElement).value;
      console.log(company, count, distribution, startPrice);
  }

  public changeOptions() {
    const costUpdateDelay = (document.getElementById('options_cost_update_delay') as HTMLInputElement).value;
    const biddingTimePeriod = (document.getElementById('options_bidding_time_period') as HTMLInputElement).value;
    console.log(costUpdateDelay, biddingTimePeriod);
  }
}


