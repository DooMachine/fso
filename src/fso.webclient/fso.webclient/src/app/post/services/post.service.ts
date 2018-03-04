
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class PostService {

    private actionUrl: string;
    private reviewActionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/Post/`;
        this.reviewActionUrl = `${environment.serviceUrls.Base}api/Review/`;

        
    }
    public GetPostIndex = (postId: number,reviewId?:number): Observable<any> => {
        if(reviewId==undefined || reviewId==null){            
        return this._http.get<any>(this.actionUrl +
            `GetPost?postId=${postId}`, { headers: this.headers});
        }
        return this._http.get<any>(this.actionUrl +
             `GetPost?postId=${postId}&reviewId=${reviewId}`, { headers: this.headers});
    }
    public GetPostReviews = (postId: number, pageIndex: number, pageSize: number, order: string): Observable<any> => {
        return this._http.get<any>(this.reviewActionUrl +
             `GetPostReviews?postId=${postId}&pageIndex=${pageIndex}&pageSize=${pageSize}&reviewOrder=${order}`,
             { headers: this.headers});
    }
    public GetReviewComments = (reviewId: number): Observable<any> => {
        return this._http.get<any>(this.reviewActionUrl +
             `GetReviewComments?reviewId=${reviewId}`,
             { headers: this.headers});
    }

    public GetPaginatedReviews = (postId:number,pageIndex:number,pageSize:number,order?:string): Observable<any> => {
        
        return this._http.get<any>(this.actionUrl + `GetPaginatedReviews?postId=${postId}&pageIndex=${pageIndex}&pageSize=${pageSize}&order=${order}&`,
              { headers: this.headers});
    }
}
