
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class ExploreService {

    private actionUrl: string;
    private followActionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/Explore/`;
        this.followActionUrl = `${environment.serviceUrls.Base}api/Group/`;

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    public GetExploreServices = (langCode: string ="WW" , pageIndex: number, pageSize: number, order: string): Observable<any> => {
        return this._http.get<any>
        (this.actionUrl + `GetExploreInterests?langCode=${langCode}&pageIndex=${pageIndex}&pageSize=${pageSize}&order=${order}`,
        {headers: this.headers});
    }

    public FollowInterest = (groupId: number): Observable<any> => {
        const body: any = { 'groupId': groupId };
        return this._http.post<any>(this.followActionUrl + `Join`,
             JSON.stringify(body), { headers: this.headers});
    }

    public UnfollowInterest = (groupId: number): Observable<any> => {
        const body: any = { 'groupId': groupId };
        return this._http.post<any>(this.followActionUrl + `Leave`,
             JSON.stringify(body), { headers: this.headers});
    }
}
