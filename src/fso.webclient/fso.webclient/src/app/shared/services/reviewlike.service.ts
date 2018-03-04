
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class ReviewLikeService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/Review/`;
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    public LikeReview = (reviewId: number): Observable<any> => {
        const body: any = { 'reviewId': reviewId };
        return this._http.post<any>(this.actionUrl + `LikeReview`, JSON.stringify(body), { headers: this.headers});
    }
    public UnlikeReview = (reviewId: number): Observable<any> => {
        const body: any = { 'reviewId': reviewId };
        return this._http.post<any>(this.actionUrl + `UnlikeReview`, JSON.stringify(body), { headers: this.headers});
    }
    public DislikeReview = (reviewId: number): Observable<any> => {
        const body: any = { 'reviewId': reviewId };
        return this._http.post<any>(this.actionUrl + `DislikeReview`, JSON.stringify(body), { headers: this.headers});
    }
    public UndislikeReview = (reviewId: number): Observable<any> => {
        const body: any = { 'reviewId': reviewId };
        return this._http.post<any>(this.actionUrl + `UndislikeReview`, JSON.stringify(body), { headers: this.headers});
    }
}
