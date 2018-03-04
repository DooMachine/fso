import { Injectable } from '@angular/core';

@Injectable()
export class LocalizationService {
    constructor(){}
    public GetAllUserLanguages(): string[] {
        return navigator.languages; 
    }
    public GetUserLanguage(): string {
        return navigator.language; 
    }
    public GetUserGeoLocations(){
        return navigator.geolocation;
    }
}