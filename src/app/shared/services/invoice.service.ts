import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../apis/api-end-points';
import {
  CommonResponse,
  InvoiceDataResponse,
  InvoiceSaveRequest,
} from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private baseUrl = apiEndpoint;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/Json' }),
  };

  constructor(private http: HttpClient) {}

  sendInvoiceData(
    invoiceRequest: InvoiceSaveRequest
  ): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(
      this.baseUrl.saveInvoiceData,
      invoiceRequest,
      this.httpOptions
    );
  }

  getAllInvoices(): Observable<InvoiceDataResponse[]> {
    return this.http.get<InvoiceDataResponse[]>(
      this.baseUrl.getAllInvoiceData,
      this.httpOptions
    );
  }
}
