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
