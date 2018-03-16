import { AuthConfig } from 'angular-oauth2-oidc';

export const authDevConfig: AuthConfig = {

    // Url of the Identity Provider 
    issuer: 'http://account.localhost',
  
    // URL of the SPA to redirect the user to after login
    redirectUri: 'http://192.168.1.67:10575/oAuthCallback',
    requireHttps: false,
  
    silentRefreshRedirectUri: 'http://192.168.1.67:10575/silent-refresh.html',
  
    // The SPA's id. The SPA is registerd with this id at the auth-server
    clientId: 'fso.AngularClient',
  
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: 'openid email profile fso.Api fso.NotificationApi fso.StatsApi fso.AppFileProvider',
    oidc: true,
    silentRefreshIFrameName: 's-renew',
    sessionChecksEnabled: true,
    sessionCheckIFrameName: 's-check',
    timeoutFactor:0.2
  };