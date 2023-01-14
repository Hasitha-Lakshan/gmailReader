import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';
import { gmailEndpoint } from '../apis/api-end-points';
import { authCodeFlowConfig } from '../models/auth-config';
import { Gmail, Messages } from '../models/gmail';
import { UserInfo } from '../models/user';

@Injectable({
  providedIn: 'root',
})

export class GoogleService {

  private gmailUrl = gmailEndpoint;
  userProfileSubject = new Subject<UserInfo>();

  constructor(
    private readonly oAuthService: OAuthService,
    private readonly http: HttpClient
  ) {
    // configure oauth2 service
    oAuthService.configure(authCodeFlowConfig);
    // manually configure a logout url, because googles discovery document does not provide it
    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout';
    // loading the discovery document from google, which contains all relevant URL for
    // the OAuth flow, e.g. login url
    oAuthService.loadDiscoveryDocument().then(() => {
      // This method just tries to parse the token(s) within the url when
      // the auth-server redirects the user back to the web-app
      // It doesn't send the user the the login page
      oAuthService.tryLoginImplicitFlow().then(() => {
        // when not logged in, redirect to google for login
        // else load user profile
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow()
        } else {
          oAuthService.loadUserProfile().then((userProfile) => this.userProfileSubject.next(userProfile as UserInfo));
        }
      });
    });
  }

  /**
   * This function is used to fetch all the mails using the user Id from gmail 
   * @param userId 
   * @returns : Messages type Observable
   */
  getAllMails(userId: string): Observable<Messages> {
    return this.http.get<Messages>(`${this.gmailUrl.gmailUsers}${userId}/messages`, { headers: this.authHeader() });
  }

  /**
   * This function is used to fetch a particular mail using the user Id and its mail Id from gmail 
   * @param userId 
   * @param mailId
   * @returns : Gmail type Observable
   */
  getMail(userId: string, mailId: string): Observable<Gmail> {
    return this.http.get<Gmail>(`${this.gmailUrl.gmailUsers}${userId}/messages/${mailId}`, { headers: this.authHeader() });
  }

  /**
   * This function is used to get HttpHeaders for authorization
   * @returns : HttpHeaders
   */
  private authHeader(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.oAuthService.getAccessToken()}` });
  }

  /**
   * This function is used to validate the token
   * @returns : token status
   */
  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  /**
   * This function is used to logout from the google account
   */
  signOut() {
    this.oAuthService.logOut();
  }

}