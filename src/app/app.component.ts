import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GoogleService, UserInfo } from './shared/google.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-google-oauth-example';

  mailSnippets: any[] = [];
  userInfo?: UserInfo;

  constructor(private readonly googleApi: GoogleService) {
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
    this.mailSnippets = [];
    if (!this.userInfo) {
      return;
    }

    const userId = this.userInfo?.info.sub as string;
    const messages = await lastValueFrom(this.googleApi.emails(userId));
    messages.messages.forEach((element: any) => {
      const mail = lastValueFrom(this.googleApi.getMail(userId, element.id));
      mail.then((mail) => {
        mail.payload.headers.forEach((header: header) => {
          if (header.name === 'Subject' && header.value.includes('invoice')) {
            this.mailSnippets.push({
              id: mail.id,
              threadId: mail.threadId,
              snippet: mail.snippet,
              headers: mail.payload.headers,
            });
          }
        });
      });
    });
  }
}
export interface header {
  name: string;
  value: string;
}
