import { Component } from '@angular/core';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { GoogleService, UserInfo } from './shared/google.service';
import { Gmail, MappedGmail } from './shared/models/gmail';
import { InvoiceSaveRequest } from './shared/models/invoice';
import { InvoiceService } from './shared/services/invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userInfo?: UserInfo;

  constructor(
    private readonly googleApi: GoogleService,
    private readonly invoiceService: InvoiceService
  ) {
    googleApi.userProfileSubject.subscribe((info) => {
      this.userInfo = info;
    });
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }

  logout() {
    this.googleApi.signOut();
  }

  async getEmails() {
    if (!this.userInfo) {
      return;
    }

    const userId = this.userInfo?.info.sub as string;
    const messages = await lastValueFrom(this.googleApi.emails(userId));
    messages.messages.forEach((element: any) => {
      const mail = lastValueFrom(this.googleApi.getMail(userId, element.id));
      mail
        .then((mail: Gmail) => {
          const index = mail.payload.headers.findIndex(
            (header) => header.name === 'Subject'
          );

          if (
            index > -1 &&
            mail.payload.headers[index].value.toLowerCase().includes('invoice')
          ) {
            return {
              id: mail.id,
              threadId: mail.threadId,
              snippet: mail.snippet,
              headers: mail.payload.headers,
            };
          }
          return null;
        })
        .then((mappedGmail) => {
          if (mappedGmail !== null) {
            this.mapInvoiceData(mappedGmail);
          }
        });
    });
  }

  mapInvoiceData(mappedMail: MappedGmail) {
    if (mappedMail) {
      const invoiceRequest = {
        id: mappedMail.id,
        subject: '',
        body: mappedMail.snippet,
        date: '',
        invoiceFrom: '',
        invoiceTo: '',
      };

      mappedMail.headers.forEach((header) => {
        if (header.name === 'Subject') {
          invoiceRequest.subject = header.value;
        }
        if (header.name === 'Date') {
          invoiceRequest.date = moment(header.value).format(
            'DD-MM-yyyy hh:mm:ss a'
          );
        }
        if (header.name === 'From') {
          invoiceRequest.invoiceFrom = header.value;
        }
        if (header.name === 'To') {
          invoiceRequest.invoiceTo = header.value;
        }
      });
      this.sendInvoiceData(invoiceRequest);
    }
  }

  sendInvoiceData(request: InvoiceSaveRequest) {
    this.invoiceService.sendInvoiceData(request).subscribe(
      (response) => {
        if (response.status) {
          console.log('Data Saved');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
