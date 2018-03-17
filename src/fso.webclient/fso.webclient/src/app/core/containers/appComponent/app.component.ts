import { Component, ChangeDetectionStrategy, Inject,PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../../auth/config/AuthConfig';
import { authDevConfig } from '../../../auth/config/AuthConfig.dev';
import { environment } from '../../../../environments/environment';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as authActions from '../../../auth/actions/auth.actions';
import { selectUserName, selectUserProfileImage } from '../../../auth/reducers/auth.reducer';
import { OnInit, OnDestroy } from '@angular/core';
import * as layoutActions from '../../actions';
import { NavbarMode, ProgressBarState } from '../../reducers';
import {
  JwksValidationHandler,
  OAuthStorage
} from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { transition, trigger, animate, style } from '@angular/animations';
import { Direction } from "@angular/cdk/bidi";
import { MenuPositionX } from "@angular/material/menu";
import { CookieService } from "../../../shared/services/cookie.service";
import { BrowserTokenStoreService } from "../../../auth/services/token-store.service";

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({transform: 'translateX(100%)'}),
            animate(211)
        ]),
        transition('* => void', [
            animate(211, style({transform: 'translateX(100%)'}))
        ])
    ]),
    trigger('panelLeftRight', [
      transition('void => *', [
          style({transform: 'translateX(-100%)'}),
          animate(211)
      ]),
      transition('* => void', [
          animate(211, style({transform: 'translateX(-100%)'}))
      ])
  ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  navbarMode$: Observable<NavbarMode>;
  navbarColor$: Observable<string>;
  navbarTextColor$: Observable<string>;
  loggedUserName$: Observable<string>;
  showSearchInput$: Observable<boolean>;  
  isDarkTheme$:Observable<boolean>;
  themeClass$:Observable<string>;
  profileImage$:Observable<string>;
  progressBarMode$: Observable<ProgressBarState>;
   
  constructor
  (    
    private oauthService: OAuthService,
    private cookieService:OAuthStorage,
    private store: Store<fromRoot.State>,
    @Inject(PLATFORM_ID) private platformId: Object
  )
  {   
    if (isPlatformBrowser(this.platformId)) {
      this.configureWithNewConfigApi();
      this.oauthService.events.subscribe(e => {
          console.log('oauth/oidc event', e);
      });

      this.oauthService.events
          .filter(e => e.type === 'session_terminated')
          .subscribe(e => {
              console.log('Your session has been terminated!');
          });

      this.oauthService.events
        .filter(e => e.type === 'token_received')
        .subscribe(e => {
              this.store.dispatch( new authActions.CheckUserAuthState());
        });
    }
    
    this.progressBarMode$ = this.store.
      select(state=> state['layout'].progressBarMode)
    this.showSidenav$ = this.store.select(state => state['layout'].showSidenav);
    this.showSearchInput$ = this.store.select(state => state['layout'].showSearchInput);
    this.loggedIn$ = this.store.select(state => state['auth'].isAuthenticated);
    this.loggedUserName$ = this.store.select(selectUserName);
    this.navbarMode$ = this.store.select(state => state['layout'].navbarMode);
    this.themeClass$ = this.store.select(fromRoot.selectThemeClass);
    this.isDarkTheme$ = this.store.select(fromRoot.selectIsDarkTheme);
    this.profileImage$ = this.store.select(selectUserProfileImage);
  }

  ngOnInit() {
  
  if (isPlatformBrowser(this.platformId)) {    
    console.log("plat browser")
      this.handleDarkMode();
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
            this.store.dispatch(new authActions.CheckUserAuthState());
        });
      }
  }
  closeSidenav() {
    this.store.dispatch(new layoutActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new layoutActions.OpenSidenav());
  }
  toggleTheme($event){
    $event.preventDefault();
    this.store.dispatch(new layoutActions.ToggleThemeBase());
  }
  ngOnDestroy() {

  }
  private configureWithNewConfigApi() {
    if(environment.production){
      this.oauthService.configure(authConfig);
    }else{
      this.oauthService.configure(authDevConfig);
    }
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
  }
  login() {
    this.store.dispatch(new authActions.AttemptLogin());
  }
  logout() {
    this.store.dispatch(new authActions.AttemptLogout());
  }

  toggleSearch($event){
    this.store.dispatch(new layoutActions.ToggleSearchInputAction());
  }
  handleDarkMode(){
    const isDark = this.cookieService.getItem('isdark');
    if(isDark=="true"){
      this.store.dispatch(new layoutActions.ToggleThemeBase(true));
    }
  }
  
}
