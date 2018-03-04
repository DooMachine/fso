
import { Injectable, Injector, Optional } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { 
    HttpHeaders, HttpInterceptor, HttpRequest, HttpEvent,
    HttpHandler , HttpResponse, HttpErrorResponse
    } from '@angular/common/http';

import { OAuthService, OAuthStorage, OAuthResourceServerErrorHandler,
      } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';
import { AuthState } from '../reducers/auth.reducer';
import { ServerTokenStoreService } from '../services/token-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService: OAuthService;

    constructor(private injector: Injector,
        private authStorage: OAuthStorage,
        private errorHandler: OAuthResourceServerErrorHandler,
        private store: Store<AuthState>) {
    }
    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        // handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            // navigate /delete cookies or whatever
            console.log("AUTH ERROR=>",err);
            this.store.dispatch(new authActions.TokenExpiredAction())
            // if you've caught /
            // handled the error, you don't want to rethrow it unless you also want downstream 
            // consumers to have to handle it as well.
            return Observable.of(err.message);
        }
        return Observable.of(err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestToForward = req;
        const token = this.authStorage.getItem('access_token');
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        

        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // do stuff with response if you want
            }
          })
          .catch((err) => this.handleAuthError(err));
    }

    getAuthService(): OAuthService {
        if (typeof this.authService === 'undefined') {
            this.authService = this.injector.get(OAuthService);
        }
        return this.authService;
    }
}
