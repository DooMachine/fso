
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class NotificationService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Notification}api/Notification/`;
        
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    public GetNotifications = (pageIndex: number, pageSize: number): Observable<any> => {       
        console.log(this.headers); 
        return this._http.get<any>(this.actionUrl + `GetUserNotifications?pageNumber=${pageIndex}&pageSize=${pageSize}`, { headers: this.headers});
    }
    public GetNotificationUpdates = (lastNotificationId:number): Observable<any> => {    
        return this._http.get<any>(this.actionUrl + `GetNotificationUpdates?lastNotificationId=${lastNotificationId}`, { headers: this.headers});
    }
    public SetNotificationsAsSeen(ids: Array<number>) {
        
        

        const body: any = { 'notificationIds': ids };
        const url = this.actionUrl + 'SetReaded';
        return this._http.post<any>(url, JSON.stringify(body), { headers: this.headers });
    }
}