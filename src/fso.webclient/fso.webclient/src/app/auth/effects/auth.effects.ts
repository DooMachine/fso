import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import * as authActions from '../actions/auth.actions';
import { AuthState } from '../reducers/auth.reducer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
export type Action = authActions.All;

@Injectable()
export class AuthEffects {
    private oauthService: OAuthService;

    constructor(
        private actions: Actions,
        private injector: Injector,
        private store: Store<AuthState>,
        private router: Router
    ) {}
    
    @Effect({ dispatch: false })
    onAuthorizeSuccessAction: Observable<Action> = this.actions
      .ofType(authActions.CALLBACK_AUTHORIZE_SUCCESS_ACTION)
      .do(() => this.router.navigate(['/']));

    @Effect()
    onUserCallbackSuccess: Observable<Action> = this.actions
        .ofType(authActions.CALLBACK_AUTHORIZE_SUCCESS_ACTION)
        .mergeMap((action) => {
            return Observable.of(new authActions.CheckUserAuthState());
        });
        
     @Effect()
     onCheckUserAuthState: Observable<Action> = this.actions
       .ofType(authActions.CHECK_USER_AUTH_STATE)
       .mergeMap((action) => {
            const authService = this.getAuthService();
            const isAuthenticated = authService.hasValidIdToken() && authService.hasValidIdToken();
           
            return Observable.of(new authActions.CheckUserAuthStateSuccess({ isAuthenticated: isAuthenticated}));
       });

    @Effect()
    onCheckUserStateSuccess: Observable<Action> = this.actions
        .ofType(authActions.CHECK_USER_AUTH_STATE_SUCCESS)
        .switchMap((action) => {
            const existsInStore = action['payload'].isAuthenticated;
            let res;
            if (existsInStore) {
              res = Observable.of(new authActions.GetUserInfo());
            } else {
              res =  Observable.of(new authActions.CallbackAuthorizeFailAction({isAuthenticated: false}));
            }
            return res;
        });
    // @Effect()
    // onCallbackFail: Observable<Action> = this.actions
    //     .ofType(authActions.CALLBACK_AUTHORIZE_FAIL_ACTION)
    //     .switchMap((action) => {
    //         this.getAuthService();
    //         return Observable.of(new authActions.AttemptLogin());        
    // });
    @Effect()
        onGetUserInfo: Observable<Action> = this.actions
          .ofType(authActions.GET_USER_INFO)
          .switchMap((action) => {
            this.getAuthService();
            let obs;
            this.oauthService.loadUserProfile().then((userData) => {
                obs = new authActions.GetUserInfoSuccess({ isUserDataLoaded: true, userData: userData });
            }).catch((err)=>{ obs = Observable.of({type:"No_ACTION"}) })
            return obs;
        });
    @Effect({dispatch: false})
        onAttemptLogin: Observable<Action> = this.actions
          .ofType(authActions.ATTEMPT_LOGIN)
          .do(() => {
              this.getAuthService();
                this.oauthService.initImplicitFlow();
            });

    @Effect({dispatch: false})
    onAttemptLogout: Observable<Action> = this.actions
        .ofType(authActions.ATTEMPT_LOGOUT)
        .do(() => {
            this.getAuthService();
            this.oauthService.logOut();
        });

    @Effect()
    tokenExpired: Observable<Action> = this.actions
        .ofType(authActions.TOKEN_EXPIRED_ACTION)
        .map((action) =>new authActions.CheckUserAuthState()
         );

    private getAuthService(): OAuthService {
        if (typeof this.oauthService === 'undefined') {
            this.oauthService = this.injector.get(OAuthService);
        }
        return this.oauthService;
    }
}
