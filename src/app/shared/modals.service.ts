import { Injectable } from '@angular/core';

export interface Field {
  id: number;
  labelText: string;
}

export interface Modal {
  id: string;
  title: string;
  fields: Field[];
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  public modals: Modal[] = [{id: 'exampleModalCenter', title: 'test modal', fields: [{id: 1, labelText: 'a'}]},
                            {id: 'exampleModalCenter1', title: 'test modal', fields: [{id: 1, labelText: 'b'}]}];
}
