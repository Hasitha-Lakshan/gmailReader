import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: 'https://accounts.google.com',
    // strict discovery document disallows urls which not start with issuers url
    strictDiscoveryDocumentValidation: false,
    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin,
    // The SPA's id. The SPA is registered with this id at the auth-server
    // clientId: 'server.code',
    clientId: '3379262491-l6eic0h8u5hps6q87rceee3tbi5s10po.apps.googleusercontent.com',
    // set the scope for the permissions the client should request
    scope: 'openid profile email https://mail.google.com',
    // show debug info
    showDebugInformation: true
};