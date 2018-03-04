
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Injectable()
export class ProfileSettingsService {

    private actionUrl: string;
    private followActionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/ProfileSettings/`;

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    
    public GetProfileSettings = (): Observable<any> => {
        return this._http.get<any>(this.actionUrl +
            `GetProfileSettings`, { headers: this.headers});
    }
    
    public UpdateProfileSettings = (formValues: any): Observable<any> => {
        const body: any = { 'model': formValues };
        return this._http.post<any>(this.actionUrl + `SaveProfileSettings`,
             JSON.stringify(body), { headers: this.headers});
    }
}
