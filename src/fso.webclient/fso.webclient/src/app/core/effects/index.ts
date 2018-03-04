import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import * as LayoutActions from '../actions';
import { ShowSnackBarAction, ToggleThemeBase } from '../actions';
import { MatSnackBar } from '@angular/material';
import { CookieService } from "../../shared/services/cookie.service";
import { BrowserTokenStoreService } from "../../auth/services/token-store.service";
import { OAuthStorage } from "angular-oauth2-oidc";

@Injectable()
export class LayoutEffects {
  @Effect({ dispatch: false })
  onShowSnackbar$ = this.actions$.ofType<ShowSnackBarAction>(LayoutActions.LayoutActionTypes.ShowSnackBar)
    .map((action) => action.payload)
    .do((payload) =>{
        this.snackBar.open(payload.message, payload.action , payload.config);
    });
    @Effect({ dispatch: false })
    onToggleTheme$ = this.actions$.ofType<ToggleThemeBase>(LayoutActions.LayoutActionTypes.ToggleThemeBase)
      .map((action) => action.payload)
      .do((payload) =>{
        const isd = this.cookieService.getItem('isdark');
        console.log(isd);
          if(payload){
            this.cookieService.setItem('isdark',"true")
          }else if(isd=="false"){
            this.cookieService.setItem('isdark',"true")
          }else{
            this.cookieService.setItem('isdark',"false")
          }
      });
  constructor(
    private actions$: Actions,
    public snackBar: MatSnackBar,
    private cookieService:OAuthStorage
  ) {}
}