
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class PostLikeService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/Post/`;
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    public LikePost = (postId: number): Observable<any> => {
        const body: any = { 'postId': postId };
        return this._http.post<any>(this.actionUrl + `LikePost`, JSON.stringify(body), { headers: this.headers});
    }
    public UnlikePost = (postId: number): Observable<any> => {
        const body: any = { 'postId': postId };
        return this._http.post<any>(this.actionUrl + `UnlikePost`, JSON.stringify(body), { headers: this.headers});
    }
}
