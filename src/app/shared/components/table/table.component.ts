import { Component, Input, OnInit } from '@angular/core';
import { InvoiceDataResponse } from '../../models/invoice';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input()
  invoiceDataList: InvoiceDataResponse[] = [];

  constructor() {}

  ngOnInit(): void {}
}
