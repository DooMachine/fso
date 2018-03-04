
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class UserFollowService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/UserInfo/`;

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    public FollowUser = (userName: string): Observable<any> => {
        const body: any = { 'userName': userName };
        return this._http.post<any>(this.actionUrl + `FollowUser`, JSON.stringify(body), { headers: this.headers});
    }
    public UnfollowUser = (userName: string): Observable<any> => {
        const body: any = { 'userName': userName };
        return this._http.post<any>(this.actionUrl + `UnfollowUser`, JSON.stringify(body), { headers: this.headers});
    }
}
