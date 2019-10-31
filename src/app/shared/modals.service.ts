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


@Injectable({providedIn: 'root'})
export class ModalService {
  private myId: number;
  public modals: Modal[] = [
    {
      id: 'addMember', title: 'Add member',
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
      fun: this.getMember
    },
    {
      id: 'addStock', title: 'Add stock',
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
      fun: this.getStock
    },
    {
      id: 'exchangeOptions', title: 'Exchange options',
      fields:
        [
          {
            id: 'options_cost_update_delay',
            labelText: 'cost_update_delay'
          },
          {
            id: 'options_bidding_time_period',
            labelText: 'bidding_time_period'
          }
        ],
      fun: this.changeOptions
    },
    {
      id: 'Editor', title: 'Editor',
      fields:
        [
          {
            id: 'editor_stock_company',
            labelText: 'company'
          },
          {
            id: 'editor_stock_count',
            labelText: 'number'
          },
          {
            id: 'editor_stock_distribution',
            labelText: 'distribution'
          },
          {
            id: 'editor_stock_start_price',
            labelText: 'start_price'
          }
        ],
      fun: this.edit
    }
  ];

  public getMember() {
    const data = { id: 0,
          name: (document.getElementById('member_name') as HTMLInputElement).value,
          money: parseInt((document.getElementById('member_money') as HTMLInputElement).value, 10)
    }
    console.log(data);
    return data;
  }

  public getStock() {
    const data = { id: 2,
             company: (document.getElementById('stock_company') as HTMLInputElement).value,
             number: parseInt((document.getElementById('stock_count') as HTMLInputElement).value, 10),
             distribution: (document.getElementById('stock_distribution') as HTMLInputElement).value,
             start_price: parseInt((document.getElementById('stock_start_price') as HTMLInputElement).value, 10)
    };
    console.log(data);
    return data;
  }

  public changeOptions() {
    const data = {
        cost_update_delay: parseInt((document.getElementById('options_cost_update_delay') as HTMLInputElement).value, 10),
        bidding_time_period: parseInt((document.getElementById('options_bidding_time_period') as HTMLInputElement).value, 10)
    }
    console.log(data);
    return data;
  }

  public edit() {
    const data = { id: parseInt(localStorage.id, 10),
        company: (document.getElementById('editor_stock_company_E') as HTMLInputElement).value,
        number: parseInt((document.getElementById('editor_stock_count_E') as HTMLInputElement).value, 10),
        distribution: (document.getElementById('editor_stock_distribution_E') as HTMLInputElement).value,
        start_price: parseInt((document.getElementById('editor_stock_start_price_E') as HTMLInputElement).value, 10)
    };
    console.log(data);
    return data;
  }

    public getId() {
        return localStorage.id;
    }

  public setId(id) {
    localStorage.id = id;
  }
}


