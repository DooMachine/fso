import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../material/index';
import { reducers } from './reducers';
import { ProfileSettingsComponent } from './containers/profilesettings.container';
import { UserProfileimageComponent } from './components/user-profileimage/user-profileimage.component';
import { UserImageService } from './services/userimage.service';
import { ProfileSettingsService } from './services/profilesettings.service';
import { ProfileImageEffects } from './effects/profileimage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProfileSettingsEffects } from './effects/profilesettings';
import { UserProfileSettingsformComponent } from './components/user-profile-settingsform/user-profile-settingsform.component';

const COMPONENTS = [
    ProfileSettingsComponent,
    UserProfileimageComponent,
    UserProfileSettingsformComponent
];
const SERVICES = [
    UserImageService,
    ProfileSettingsService
]
const NGRX_EFFECTS = [
    ProfileImageEffects,
    ProfileSettingsEffects
]
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('profilesettings', reducers),
        EffectsModule.forFeature(NGRX_EFFECTS),
        RouterModule.forChild([
            { path: '', component: ProfileSettingsComponent },
        ]),
      ],
      declarations: COMPONENTS,
      exports: COMPONENTS,
      providers: [...SERVICES]
})
export class ProfileSettingsModule {}
