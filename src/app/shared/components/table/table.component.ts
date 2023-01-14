import { Component, HostListener, Input, OnInit } from '@angular/core';
import { InvoiceDetailsResponse } from '../../models/invoice';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements OnInit {

  isShowInvoiceTo: boolean = true;

  @Input()
  invoiceDataList: InvoiceDetailsResponse[] = [];

  @HostListener('window:resize')
  onResize() {
    this.isShowInvoiceTo = (window.innerWidth < 700) ? false : true;
  }

  constructor() { }

  ngOnInit(): void { }
}
