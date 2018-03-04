
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class InterestService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/Group/`;
    }
    public GetGroupIndex = (urlKey: string, pageIndex: number, pageSize: number,order:string): Observable<any> => {
        return this._http.get<any>(this.actionUrl +
             `GetGroupIndex?urlkey=${urlKey}&pageIndex=${pageIndex}&pageSize=${pageSize}&order=${order}`, { headers: this.headers});
    }
    public GetGroupPosts = (urlKey: string, pageIndex: number, pageSize: number,order:string): Observable<any> => {
        return this._http.get<any>(this.actionUrl +
             `GetGroupPosts?urlKey=${urlKey}&pageIndex=${pageIndex}&pageSize=${pageSize}&order=${order}`, { headers: this.headers});
    }
    public GetGroupNeedReviews = (urlKey: string, pageIndex: number, pageSize: number,order:string): Observable<any> => {
        return this._http.get<any>(this.actionUrl +
             `GetGroupUnreviewedPosts?urlKey=${urlKey}&pageIndex=${pageIndex}&pageSize=${pageSize}&order=${order}`, { headers: this.headers});
    }
    public GetTrendingPosts = (urlKey: string, pageIndex: number, pageSize: number,order:string): Observable<any> => {
        return this._http.get<any>(this.actionUrl +
             `GetTrendingPosts?urlKey=${urlKey}&pageIndex=${pageIndex}&pageSize=${pageSize}&order=${order}`, { headers: this.headers});
    }
    public GetFollowers = (urlKey: string, pageIndex: number, pageSize: number,order:string): Observable<any> => {
        return this._http.get<any>(this.actionUrl +
             `GetGroupUsers?urlKey=${urlKey}&pageIndex=${pageIndex}&pageSize=${pageSize}&order=${order}`, { headers: this.headers});
    }
}
