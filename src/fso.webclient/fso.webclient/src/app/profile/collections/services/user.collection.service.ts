
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Injectable()
export class UserCollectionService {

    private actionUrl: string;
    private collectionActionUrl:string;
    private collectionImgUrl:string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.actionUrl = `${environment.serviceUrls.Base}api/UserInfo/`;
        this.collectionActionUrl = `${environment.serviceUrls.Base}api/Collections/`;
        this.collectionImgUrl = `${environment.serviceUrls.AppMedia}v1/PostCollectionImage/`;

        
    }
    public GetUserCollections = (userName: string, pageIndex: number, pageSize: number,order:string): Observable<any> => {
        this.setHeaders();
        return this._http.get<any>
        (this.actionUrl + `GetUserCollections?userName=${userName}&pageIndex=${pageIndex}&pageSize=${pageSize}&order=${order}`,
        { headers: this.headers});
    }
    public AddCollection = (formValues:any): Observable<any> => {
        this.setHeaders();
        return this._http.post<any>
        (this.collectionActionUrl + `AddCollection`,
        JSON.stringify(formValues),
        { headers: this.headers});
    }

    public DeleteCollection = (collectionId: number): Observable<any> => {
        const body: any = { 'id': collectionId };
        return this._http.post<any>(this.collectionActionUrl + `DeleteCollection`, JSON.stringify(body), { headers: this.headers});
    }
    public UpdateCollectionImage(fileToUpload: any, collectionId: number): Observable<any> {
        
        const formData: FormData = new FormData();
        var sFileName = fileToUpload.name;
        var iFileSize = fileToUpload.size;
        if(!this.IsFileImage(sFileName)){
            return;
        }
        if(this.CheckFileBiggerThen(iFileSize , 3)){
            return;
        }
        formData.append('collectionimage', fileToUpload, fileToUpload.name);
        formData.append('collectionid', collectionId.toString());
        return this._http
          .post<any>(this.collectionImgUrl+ `UpdatePostCollectionImage`,
           formData)
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
        
        const iConvertMB = (fileSize / 10485760);
        if(maxFileSize <= iConvertMB){
            return true
        }
        return false;
    }

    private setHeaders(){
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }
}
