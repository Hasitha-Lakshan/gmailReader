import { Component } from '@angular/core';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { GoogleService } from './shared/services/google.service';
import { Gmail, Header } from './shared/models/gmail';
import { InvoiceDetailsResponse, InvoiceSaveRequest, MapHeader } from './shared/models/invoice';
import { InvoiceService } from './shared/services/invoice.service';
import { UserInfo } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userInfo?: UserInfo;
  invoiceDataList: InvoiceDetailsResponse[] = [];
  isSavedAllInvoices: boolean = false;
  isReceivedAllInvoices: boolean = false;

  constructor(
    private readonly googleApi: GoogleService,
    private readonly invoiceService: InvoiceService
  ) {
    googleApi.userProfileSubject.subscribe(info => this.userInfo = info);
  }

  /**
   * This function is used to fetch all the emails from gmail account
   */
  async getAllMailsFromGmail() {
    this.isSavedAllInvoices = true;

    if (!this.userInfo) {
      this.isSavedAllInvoices = false;
      return;
    }
    const userId = this.userInfo?.info.sub as string;
    const messages = await lastValueFrom(this.googleApi.getAllMails(userId));

    messages.messages.forEach(element => {
      const mail = lastValueFrom(this.googleApi.getMail(userId, element.id));
      mail.then(mail => {
        // checking for invoices and mapping email details
        const index = mail.payload.headers.findIndex(header => header.name === 'Subject');
        if (index > -1 && mail.payload.headers[index].value.toLowerCase().includes('invoice')) {
          const invoiceRequest = { id: mail.id, ...this.mapHeaders(mail.payload.headers) };
          // pass invoice details 
          this.sendInvoiceDetails(invoiceRequest);
        }
      });
    });
  }

  /**
   * This function is used to map the original email headers to MapHeader type
   * @param headers : original email headers
   * @returns : mapped email headers
   */
  mapHeaders(headers: Header[]): MapHeader {
    const mappedHeaders = { subject: '', date: '', invoiceFrom: '', invoiceTo: '' };
    headers.forEach((header) => {
      if (header.name === 'Subject') mappedHeaders.subject = header.value;
      if (header.name === 'Date') mappedHeaders.date = moment(header.value).format('DD-MM-yyyy hh:mm:ss a');
      if (header.name === 'From') mappedHeaders.invoiceFrom = this.filterMailId(header.value);
      if (header.name === 'To') mappedHeaders.invoiceTo = this.filterMailId(header.value);
    });
    return mappedHeaders;
  }

  /**
   * This function is used to filter the email id from the header value
   * @param value : original value of header
   * @returns : email id
   */
  filterMailId(value: string): string {
    if (value) {
      const isNotFormatted = value.includes('<') && value.includes('>');
      return isNotFormatted ? value.substring(value.indexOf('<') + 1, value.indexOf('>')) : value;
    }
    return value;
  }

  /**
   * This function is used to send invoice details to backend 
   * @param request : InvoiceSaveRequest
   */
  sendInvoiceDetails(request: InvoiceSaveRequest) {
    this.invoiceService.sendInvoiceDetails(request).subscribe({
      next: (response) => {
        response.status ? console.log('Data saved') : console.log('Data not saved');
        this.isSavedAllInvoices = false;
      },
      error: (error) => {
        this.isSavedAllInvoices = false;
        console.error(error);
      }
    });
  }

  /**
   * This function is used to fetch all the invoice details from the database
   */
  getAllInvoiceDetails() {
    this.isReceivedAllInvoices = true;
    this.invoiceService.getAllInvoiceDetails().subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.invoiceDataList = response.map((item) => {
            return {
              ...item,
              date: moment(new Date(item.date)).format('DD-MM-yyyy hh:mm:ss A'),
            };
          });
        }
        this.isReceivedAllInvoices = false;
      },
      error: (error) => {
        this.isReceivedAllInvoices = false;
        console.error(error);
      }
    });
  }

  /**
   * This function is used to check the authentication status of the user
   * @returns : login status
   */
  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }

  /**
   * This function is used to sign out from google service
   */
  logout(): void {
    this.googleApi.signOut();
  }
}
