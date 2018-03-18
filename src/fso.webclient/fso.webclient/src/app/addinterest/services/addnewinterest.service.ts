
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AddNewInterestService {

    private actionUrl: string;
    private readonly acUrl:string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/AddGroup/`;
        this.acUrl = `${environment.serviceUrls.Base}api/AddPost/`;
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    public GetAutoCompleteInterests = (query: string, pageSize:number): Observable<any> => {
        return this._http.get<any>(this.acUrl+`GetAutoCompleteInterest?query=${query}&pagesize=${pageSize}`, { headers: this.headers});             
    }
    public PublishInterest = (formValues: any): Observable<any> => {
        const body: any =  formValues ;
        return this._http.post<any>(this.actionUrl + `AddGroup`,
             JSON.stringify(body), { headers: this.headers});
    }
}
