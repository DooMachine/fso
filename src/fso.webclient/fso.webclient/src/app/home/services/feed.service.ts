
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class FeedService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/Feed/`;
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }

    public GetFeed = (activityPageIndex: number, activityPageSize: number,activityOrder:string,userRecommendationPageIndex: number, userRecommendationPageSize: number,userRecommendationOrder:string,groupRecommendationsPageIndex: number, groupRecommendationsPageSize: number,groupRecommendationsOrder:string): Observable<any> => {
        return this._http.get<any>
        (this.actionUrl + 
`Hfeed?activityOrder=${activityOrder}&activityPageIndex=${activityPageIndex}&activityPageSize=${activityPageSize}&userRecommendationOrder=${userRecommendationOrder}&userRecommendationPageIndex=${userRecommendationPageIndex}&userRecommendationPageSize=${userRecommendationPageSize}&groupRecommendationsOrder=${groupRecommendationsOrder}&groupRecommendationsPageIndex=${groupRecommendationsPageIndex}&groupRecommendationsPageSize=${groupRecommendationsPageSize}`,
        {headers: this.headers});
    }
}
