
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class FeedCommentsService {

    private actionUrl: string;
    private commentUrl:string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/Review/`;
        this.commentUrl = `${environment.serviceUrls.Base}api/Comment/`;
    }
    public GetReviewComments = (reviewId: number): Observable<any> => {
        return this._http.get<any>(this.actionUrl +
             `GetReviewComments?reviewId=${reviewId}`,
             { headers: this.headers});
    }   

}
