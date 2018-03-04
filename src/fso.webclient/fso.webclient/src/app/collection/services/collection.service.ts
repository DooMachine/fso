
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class CollectionService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/Collections/`;
    }
    public GetCollectionIndex = (id: number,postPageIndex:number,postPageSize:number): Observable<any> => {                   
        return this._http.get<any>(this.actionUrl +
            `GetCollection?id=${id}&postPageIndex=${postPageIndex}&postPageSize=${postPageSize}`, { headers: this.headers});        
    }
}
