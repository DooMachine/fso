import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthState } from '../reducers/auth.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';

@Component({
    selector: 'app-OAuthCallback',
    template: 'Logging In...'
})

export class OAuthCallbackComponent implements OnInit, OnDestroy {

    constructor(private store: Store<AuthState>, public oauthService: OAuthService, private router: Router) {
    }

    ngOnInit() {
        if(typeof window !== 'undefined'){
            this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
                if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
                    console.log("initImplicit");
                    this.oauthService.initImplicitFlow('some-state');
                } else {
                    console.log("navigating");
                    this.router.navigate(['/']);
                }
            });
        }
        
    }

    ngOnDestroy(): void {

    }

}
