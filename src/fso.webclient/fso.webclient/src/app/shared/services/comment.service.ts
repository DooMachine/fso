
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class CommentService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/Comment/`;
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    public PublishComment = (formValues:any): Observable<any> => {
      const body: any =  formValues;
      return this._http.post<any>(this.actionUrl + `PublishComment`, JSON.stringify(body), { headers: this.headers});
  }
    public LikeComment = (commentId: number): Observable<any> => {
        const body: any = { 'commentId': commentId };
        return this._http.post<any>(this.actionUrl + `LikeComment`, JSON.stringify(body), { headers: this.headers});
    }
    public UnlikeComment = (commentId: number): Observable<any> => {
        const body: any = { 'commentId': commentId };
        return this._http.post<any>(this.actionUrl + `UnlikeComment`, JSON.stringify(body), { headers: this.headers});
    }
    public DislikeComment = (commentId: number): Observable<any> => {
        const body: any = { 'commentId': commentId };
        return this._http.post<any>(this.actionUrl + `DislikeComment`, JSON.stringify(body), { headers: this.headers});
    }
    public UndislikeComment = (commentId: number): Observable<any> => {
        const body: any = { 'commentId': commentId };
        return this._http.post<any>(this.actionUrl + `UndislikeComment`, JSON.stringify(body), { headers: this.headers});
    }
}
