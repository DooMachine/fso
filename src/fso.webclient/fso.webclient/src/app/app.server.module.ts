import { NgModule, Inject, Injector } from '@angular/core';
import { ServerModule, ServerTransferStateModule  } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './core/containers/appComponent/app.component';
import { AppModule } from './app.module';
import { OAuthModule,
        OAuthStorage
    } from 'angular-oauth2-oidc';
import { ServerTokenStoreService } from './auth/services/token-store.service';

import { State } from './reducers/index';
import { TransferState } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ModuleMapLoaderModule,
        ServerTransferStateModule
     ],
      providers:     
        [
            {
                provide: OAuthStorage,
                useClass: ServerTokenStoreService
            },
        ],
    bootstrap: [AppComponent]
})
export class AppServerModule { 
    constructor(
        private readonly transferState: TransferState,
        private readonly store: Store<State>,
      ) {
      }
}
