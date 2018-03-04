import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as profileSettingsActions from '../actions/profilesettings';
import { State } from '../reducers';
import { UserImageService } from '../services/userimage.service';
import * as fromLayoutActions from '../../../core/actions'
import * as profileImageActions from '../actions/profileimage';
import { ProfileSettingsService } from '../services/profilesettings.service';

@Injectable()
export class ProfileSettingsEffects {
     @Effect() onGetUserSettings$: Observable<Action> =
     this.actions$.ofType<profileSettingsActions.GetProfileSettings>(profileSettingsActions.ProfileSettingsActionTypes.GET_PROFILE_SETTINGS)
    .switchMap((action) => {
         return this.profileSettingsService
         .GetProfileSettings()
         .switchMap(data => {
             return Observable.from([
               new profileSettingsActions.GetProfileSettingsSuccess(data.value),
               new profileImageActions.SetImageUrl(data.value.currentProfileImageUrl)
              ])             
           })
           .catch((error) => {
             return Observable.of(
               new profileSettingsActions.GetProfileSettingsFail()
             );
           });
     });
     @Effect() onSubmitForm$: Observable<Action> =
     this.actions$.ofType<profileSettingsActions.SubmitForm>(profileSettingsActions.ProfileSettingsActionTypes.SUBMIT_FORM)
    .switchMap((action) => {
         return this.profileSettingsService
         .UpdateProfileSettings(action.payload)
         .map(data => {
             
               return new profileSettingsActions.SubmitFormSuccess(data.value);
                          
           })
           .catch((error) => {
               console.log(error);
             return Observable.of(
               new profileSettingsActions.SubmitFormFail()
             );
           });
     });
   // @Effect() onProfileImageUploadShowBar$: Observable<Action> =
   //  this.actions$.ofType<profileImageActions.UpdateImage>(profileImageActions.ProfileImageActionTypes.UPDATE_IMAGE)
   //  .switchMap((action) => {
   //    return Observable.of(new fromLayoutActions.ShowProgressBar());
   // });
   // @Effect() onProfileImageUploadFinish$: Observable<Action> =
   //  this.actions$.ofType<profileImageActions.UpdateImageSuccess>(profileImageActions.ProfileImageActionTypes.UPDATE_IMAGE_SUCCESS)
   //  .switchMap((action) => {
   //    return Observable.of(new fromLayoutActions.HideProgressBar());
   // });
   // @Effect() onProfileImageUploadFinishFail$: Observable<Action> =
   // this.actions$.ofType<profileImageActions.UpdateImageFail>(profileImageActions.ProfileImageActionTypes.UPDATE_IMAGE_FAIL)
   // .switchMap((action) => {
   //   return Observable.of(new fromLayoutActions.HideProgressBar());
   // );
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private profileSettingsService: ProfileSettingsService
    ) {}
}
