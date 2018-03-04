
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as profileImageActions from '../actions/profileimage';

export interface UploadState {
    fileToUpload: any,
    isUploading: boolean;
    showError:boolean;
    error:string;
}

export interface State {
    isLoading:boolean;    
    currentProfileImageUrl: string;
    uploadState: UploadState; 
}


export const initialState: State = {    
    isLoading: false,
    currentProfileImageUrl: environment.placeHolderImages.user,
    uploadState: {
        fileToUpload: {},
        isUploading: false,
        showError: false,
        error :''
    }

}

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case profileImageActions.ProfileImageActionTypes.SET_IMAGE_URL:
            return {
                ...state,
                currentProfileImageUrl:action.payload
            };
        case profileImageActions.ProfileImageActionTypes.UPDATE_IMAGE:
            return {
                ...state,
                uploadState: {
                    ...state.uploadState,
                    fileToUpload: action.payload.file,
                    isUploading: true
                }
            }; 
        case profileImageActions.ProfileImageActionTypes.UPDATE_IMAGE_SUCCESS:
            return {
                ...state,
                uploadState:{
                    ...state.uploadState,
                    fileToUpload: {},
                    isUploading: false
                },
                currentProfileImageUrl: action.payload.currentProfileImageUrl,
                
            };   
        case profileImageActions.ProfileImageActionTypes.UPDATE_IMAGE_FAIL:
            return {
                ...state,
                currentProfileImageUrl: action.payload.previousUrl,
                uploadState:{
                    ...state.uploadState,
                    fileToUpload: {},
                    isUploading: false
                }
            };    
      default: {
        return state;
      }
    }
  }
  