export interface InvoiceSaveRequest {
  id: string;
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

export interface InvoiceDetailsResponse {
  invoiceId: string;
  subject: string;
  date: any;
  invoiceFrom: string;
  invoiceTo: string;
}

export interface MapHeader {
  subject: string;
  date: any;
  invoiceFrom: string;
  invoiceTo: string;
}
