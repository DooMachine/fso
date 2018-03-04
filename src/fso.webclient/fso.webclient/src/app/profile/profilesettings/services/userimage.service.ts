
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Injectable()
export class UserImageService {

    private actionUrl: string;
    private followActionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.AppMedia}v1/UserImage/UpdateProfileImage`;

        this.headers = new HttpHeaders();
        // Throws error at server
        // this.headers = this.headers.set('Content-Type', 'multipart/form-data');
        this.headers = this.headers.set('Accept', 'application/json');
    }
    ChangeUserProfileImage(fileToUpload: any): Observable<any> {
        const formData: FormData = new FormData();
        var sFileName = fileToUpload.name;
        var iFileSize = fileToUpload.size;
        if(!this.IsFileImage(sFileName)){
            return;
        }
        if(this.CheckFileBiggerThen(iFileSize , 3)){
            return;
        }
        formData.append('userImage', fileToUpload, fileToUpload.name);
        return this._http
          .post<any>(this.actionUrl, formData, { headers: this.headers })
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
