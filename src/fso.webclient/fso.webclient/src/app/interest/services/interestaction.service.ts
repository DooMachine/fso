
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class InterestActionService {

    private actionUrl: string;
    private followActionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.AppMedia}v1/GroupImage/`;

        this.headers = new HttpHeaders();
        // Throws error at server
        // this.headers = this.headers.set('Content-Type', 'multipart/form-data');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    UpdateGroupCoverImage(data: any): Observable<any> {
        const formData: FormData = new FormData();
        const file = data.coverImage;
        var sFileName = file.name;
        var iFileSize = file.size;
        if(!this.IsFileImage(sFileName)){
            return;
        }
        if(this.CheckFileBiggerThen(iFileSize , 3)){
            return;
        }
        formData.append('coverImage', file, file.name);
        formData.append('groupId',data.groupId.toString());
        return this._http
          .post<any>(this.actionUrl+'UpdateGroupCoverImage', formData, { headers: this.headers })
    }
    UpdateGroupProfileImage(data: any): Observable<any> {
        const formData: FormData = new FormData();
        const file = data.profileImage;
        var sFileName = file.name;
        var iFileSize = file.size;
        if(!this.IsFileImage(sFileName)){
            return;
        }
        if(this.CheckFileBiggerThen(iFileSize , 3)){
            return;
        }
        formData.append('profileImage', file, file.name);
        formData.append('groupId',data.groupId.toString());
        return this._http
          .post<any>(this.actionUrl+'UpdateGroupProfileImage', formData, { headers: this.headers })
    }
    private IsFileImage(fileName: string): boolean {
        const okayImageExtensions = ["jpg","jpeg","png","gif"]
        const sFileExtension = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
        const isOkay = okayImageExtensions.filter((extension) => extension === sFileExtension).length
        if (!isOkay){
            return false;
        }
        return true;
    }
    private CheckFileBiggerThen(fileSize, maxFileSize): boolean {        
        const maxSizeAsMB = 3;
        const iConvertMB = (fileSize / 10485760);
        if(maxSizeAsMB <= iConvertMB){
            return true
        }
        return false;
    }
}
