export interface InvoiceSaveRequest {
  id: string;
  body: string;
  date: string;
  invoiceFrom: string;
  invoiceTo: string;
  subject: string;
}

export interface CommonResponse {
  timeStamp: Date;
  status: boolean;
  message: string;
}

export interface InvoiceDataResponse {
  invoiceId: string;
  subject: string;
  date: any;
  invoiceFrom: string;
  invoiceTo: string;
  body: string;
}
