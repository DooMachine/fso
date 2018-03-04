import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as profileImageActions from '../actions/profileimage';
import { State } from '../reducers';
import { UserImageService } from '../services/userimage.service';
import * as fromLayoutActions from '../../../core/actions'

@Injectable()
export class ProfileImageEffects {
     @Effect() onProfileImageUpload$: Observable<Action> =
     this.actions$.ofType<profileImageActions.UpdateImage>(profileImageActions.ProfileImageActionTypes.UPDATE_IMAGE)
    .switchMap((action) => {
         return this.userImageService
         .ChangeUserProfileImage(action.payload.file)
         .map(data => {
             // You don't need an array because it's only 1 item
             // If you want array use `Observable.from([ /* actions here */ ])`
             //    but then you'll need to change `map` above to
             //     `mergeMap` or `switchMap`
             //   (no big difference for this use case,
             //     `switchMap` is more conventional in Ngrx effects)
             return new profileImageActions.UpdateImageSuccess(data.value);             
           })
           .catch((error) => {
               console.log(error);
             // You probably haven't called this yet,
             //   but `catch` must return `Obsrvable`
             // Again, if you want an array use `Observable.from([ /* array */ ])`
             return Observable.of(
               new profileImageActions.UpdateImageFail(error)
             );
           });
     });
    @Effect() onProfileImageUploadShowBar$: Observable<Action> =
     this.actions$.ofType<profileImageActions.UpdateImage>(profileImageActions.ProfileImageActionTypes.UPDATE_IMAGE)
     .switchMap((action) => {
       return Observable.of(new fromLayoutActions.ShowProgressBar());
    });
    @Effect() onProfileImageUploadFinish$: Observable<Action> =
     this.actions$.ofType<profileImageActions.UpdateImageSuccess>(profileImageActions.ProfileImageActionTypes.UPDATE_IMAGE_SUCCESS)
     .switchMap((action) => {
       return Observable.of(new fromLayoutActions.HideProgressBar());
    });
    @Effect() onProfileImageUploadFinishFail$: Observable<Action> =
    this.actions$.ofType<profileImageActions.UpdateImageFail>(profileImageActions.ProfileImageActionTypes.UPDATE_IMAGE_FAIL)
    .switchMap((action) => {
      return Observable.of(new fromLayoutActions.HideProgressBar());
   });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private userImageService: UserImageService
    ) {}
}
