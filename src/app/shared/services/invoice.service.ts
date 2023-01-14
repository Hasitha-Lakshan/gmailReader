import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../apis/api-end-points';
import { CommonResponse, InvoiceDetailsResponse, InvoiceSaveRequest } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  private baseUrl = apiEndpoint;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/Json' }) };

  constructor(private http: HttpClient) { }

  /**
   * This function is used to send invoice details to backend
   * @param invoiceRequest 
   * @returns : CommonResponse type Observable
   */
  sendInvoiceDetails(invoiceRequest: InvoiceSaveRequest): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(this.baseUrl.saveInvoiceData, invoiceRequest, this.httpOptions);
  }

  /**
   * This function is used to fetch all invoice details form backend
   * @returns : InvoiceDetailsResponse[] type Observable
   */
  getAllInvoiceDetails(): Observable<InvoiceDetailsResponse[]> {
    return this.http.get<InvoiceDetailsResponse[]>(this.baseUrl.getAllInvoiceData, this.httpOptions);
  }
}
