import { BrowserModule, BrowserTransferStateModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import {SharedModule } from './shared/shared.module';
import {environment } from '../environments/environment';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ServiceWorkerModule } from '@angular/service-worker'
import { CoreModule } from './core/core.module';
import { NotificationModule } from './notification/notification.module';
import { AppComponent } from './core/containers/appComponent/app.component';

import { OAuthModule,
        OAuthStorage
      } from 'angular-oauth2-oidc';
import {  BrowserTokenStoreService } from './auth/services/token-store.service';

import { reducers, metaReducers, State, NGRX_STATE } from './reducers';
import { CustomSerializer } from './router/reducer';
import { AuthEffects} from './auth/effects/auth.effects';
import { OAuthCallbackComponent } from './auth/containers/authcallback.container';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { AuthGuard } from './auth/guards/auth.guard';
import { ModGuard } from './auth/guards/mod.guard';
import { LayoutEffects } from './core/effects/index';

const ROUTES = [
  { path : '',  loadChildren: './home/home.module#HomeModule' , pathMatch: 'full'},
  { path : 'oAuthCallback', component: OAuthCallbackComponent, },
  { path : 'trending' , loadChildren: './trending/trending.module#TrendingModule'},
  { path : 'explore' , loadChildren: './explore/explore.module#ExploreModule'},
  { path : 'explore/:urlKey' , loadChildren: './interest/interest.module#InterestModule'},
  { path : 'addnewinterest' , canActivate: [ModGuard], loadChildren: './addinterest/addinterest.module#AddNewInterestModule'},
  { path : 'post' , loadChildren: './post/post.module#PostModule'},
  { path : 'post/:postId/edit' , loadChildren: './editpost/editpost.module#EditPostModule'},  
  { path : 'profilesettings', canActivate: [AuthGuard], loadChildren: './profile/profilesettings/profilesettings.module#ProfileSettingsModule'},
  { path : 'newpost' , canActivate:[AuthGuard], loadChildren: './addpost/addnewpost.module#AddNewPostModule'},
  { path : ':userName' , loadChildren: './profile/profile.module#ProfileModule'},
]

@NgModule({
  declarations: [
    OAuthCallbackComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'x-xsrf-token',
      
    }),
    // ServiceWorkerModule.register('/ngsw-worker.js'),
    SharedModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AuthEffects,LayoutEffects]),
    StoreDevtoolsModule.instrument({maxAge: 50}),
    RouterModule.forRoot(ROUTES),    
    StoreRouterConnectingModule.forRoot( {
      stateKey: 'router'
    }),
    CoreModule.forRoot(),
    NotificationModule.forRoot(),
    OAuthModule.forRoot()
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  { provide: RouterStateSerializer,
    useClass: CustomSerializer
  },
  {
    provide: OAuthStorage,
    useClass: BrowserTokenStoreService 
  }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
      public constructor(
        private readonly transferState: TransferState,
        private readonly store: Store<State>,
    ) {
        const isBrowser = this.transferState.hasKey<any>(NGRX_STATE);

        if (isBrowser) {
            this.onBrowser();
        } else {
            this.onServer();
        }
    }
    onServer() {
        this.transferState.onSerialize(NGRX_STATE, () => {
            let state;
            this.store.subscribe( ( saveState: any ) => {
                state = saveState;
            }).unsubscribe();

            return state;
        });
    }

    onBrowser() {
        const state = this.transferState.get<any>(NGRX_STATE, null);
        this.transferState.remove(NGRX_STATE);
        this.store.dispatch( { type: 'SET_ROOT_STATE', payload: state } );
    }
}
