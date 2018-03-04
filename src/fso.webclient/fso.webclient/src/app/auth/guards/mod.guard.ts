import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class ModGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if (this.oauthService.hasValidIdToken()) {
      const claims = this.oauthService.getIdentityClaims();
      var modRoleExist = (claims['role'].indexOf("fso.api.user") > -1);
      if(modRoleExist){
        return true;
      }
    }

    this.router.navigate(['/']);
    return false;
  }
}