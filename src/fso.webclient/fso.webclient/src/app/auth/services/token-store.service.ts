import { Injectable, Inject } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { CookieService } from '../../shared/services/cookie.service';


@Injectable()
export class BrowserTokenStoreService implements OAuthStorage {

    constructor(){

    }
    getItem(key: string): string {
        return this.readCookie(key);
    }

    removeItem(key: string): void {
        this.removeCookie(key);
    }

    setItem(key: string, data: string): void {
        this.writeCookie(key, data);
    }

    readCookie(name: string) {
        const result = new RegExp('(?:^|; )' + name + '=([^;]*)').exec(document.cookie);
        return result ? decodeURIComponent(result[1]) : null;
    }

    writeCookie(name: string, value: string, days?: number) {
        if (!days) {
            days = 365 * 20;
        }

        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        const expires = '; expires=' + date.toUTCString();

        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
    }

    removeCookie(name: string) {
        this.writeCookie(name, '', -1);
    }
}

@Injectable()
export class ServerTokenStoreService implements OAuthStorage {
    private cookieStore = {};

    constructor(
        private cookieService: CookieService
    ) {        
    }


    getItem(key: string) {
        return this.cookieService.get(key);
    }

    removeItem(key: string): void { }

    setItem(key: string, data: string): void { }
}
