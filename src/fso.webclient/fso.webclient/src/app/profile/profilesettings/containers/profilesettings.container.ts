import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import * as fromProfileSettings from '../reducers/profilesettings';
import * as fromSettings from '../reducers';
import * as fromSettingsActions from '../actions/profilesettings';
import * as profileImageActions from '../actions/profileimage'
import * as fromProfileImage from '../reducers/profileimage';
import { selectUserId } from '../../../auth/reducers/auth.reducer';

@Component({
    selector: 'app-profilesettings',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="small-wrapper" >
        <div fxLayout="column" fxLayoutAlign=" center">
            <app-user-profileimage
                    [userId]="userId | async"
                    [profileImageState] = "profileImageState$ | async"
                    (onChangedInput)="changeProfileImage($event)"
                    ></app-user-profileimage>

            <app-user-profile-settingsform 
                    (onFormSubmit)="submitForm($event)"
                    [pending]="formPending$ | async"
                    [formState]="profileSettings$ | async">
                    </app-user-profile-settingsform>
        </div>
    </div>
    `,
    styles: [``]
})
export class ProfileSettingsComponent implements OnInit  {
    profileSettings$: Observable<fromProfileSettings.State>;
    profileImageState$: Observable<fromProfileImage.State>;
    userId: Observable<string>;
    formPending$: Observable<boolean>;
    constructor(
        private store: Store<fromProfileSettings.State>,
        private route: ActivatedRoute,

    ) {
        
        this.profileSettings$ = this.store.select(fromSettings.getProfileSettings);
        this.profileImageState$ = this.store.select(fromSettings.getProfileImageState)
        this.userId = this.store.select(selectUserId);
        this.formPending$ = this.store.select(fromSettings.selectPending);
    }

    ngOnInit() {
        this.store.dispatch(new fromSettingsActions.GetProfileSettings())
        // If username did not changed dont fetch data => SEEEFFECTS..
     }
     changeProfileImage($event){
         console.log($event);
         this.store.dispatch(new profileImageActions.UpdateImage({file: $event}))
     }
     submitForm($event){
         this.store.dispatch(new fromSettingsActions.SubmitForm($event));
     }
}
