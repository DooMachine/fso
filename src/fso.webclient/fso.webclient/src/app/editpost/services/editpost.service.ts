
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class EditPostService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/AddPost/`;
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    public GetEditingPost = (postId:number): Observable<any> => {
        return this._http.get<any>(this.actionUrl+`GetEditingPost?postId=${postId}`, { headers: this.headers});             
    }

    public GetAutoCompleteInterests = (query: string, pageSize:number): Observable<any> => {
        return this._http.get<any>(this.actionUrl+`GetAutoCompleteInterest?query=${query}&pagesize=${pageSize}`, { headers: this.headers});             
    }

    public AddPostPart = (postId: number): Observable<any> => {
        const body: any = { 'postId': postId };
        return this._http.post<any>(this.actionUrl + `AddPostPart`,
             JSON.stringify(body), { headers: this.headers});
    }

    public RemovePostPart = (postPartId: number): Observable<any> => {
        const body: any = { 'postPartId': postPartId };
        return this._http.post<any>(this.actionUrl + `RemovePostPart`,
             JSON.stringify(body), { headers: this.headers});
    }

    public SaveEditingPost = (formValues: any): Observable<any> => {
        const body: any =  formValues ;
        return this._http.post<any>(this.actionUrl + `SaveEditingPost`,
             JSON.stringify(body), { headers: this.headers});
    }
}
