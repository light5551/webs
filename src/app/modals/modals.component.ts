import { Component, OnInit } from '@angular/core';
import {ModalService} from '../shared/modals.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  private addMember() {

  }

}
