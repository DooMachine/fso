import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { FollowingEffects } from './effects/following';

import { reducers, metaReducer } from './reducers';
import { UserFollowingService } from './services/user.following.service';
import { UserFollowingComponent } from './containers/user-following.container';
import { SharedModule } from '../../shared/shared.module';
import { UserFollowingContentComponent } from './components/user-following-content/user-following-content.component';
import { FollowingModalComponent } from './containers/following-dialog.component';
import { MaterialModule } from '../../material/material.module';


const ROUTES = [
    { path: '', component: UserFollowingComponent }    
];

const COMPONENTS = [
    UserFollowingComponent,
    FollowingModalComponent,
    UserFollowingContentComponent
];

const EFFECTS = [
    FollowingEffects,
];

const PROVIDERS = [
    UserFollowingService,
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        StoreModule.forFeature('userfollowings', reducers,{metaReducers: metaReducer}),
        EffectsModule.forFeature(EFFECTS),
        RouterModule.forChild(ROUTES),
      ],
      declarations: COMPONENTS,
      exports: COMPONENTS,      
      providers: PROVIDERS,
      entryComponents: [
        UserFollowingContentComponent
      ]
})
export class UserFollowingsModule {}
