import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FollowersEffects } from './effects/followers';

import { reducers } from './reducers';
import { UserFollowerService } from './services/follower.service';
import { UserFollowersComponent } from './containers/user-followers.container';
import { FollowerModalComponent } from './containers/follower-dialog.component';
import { UserFollowerContentComponent } from './components/user-follower-content/user-follower-content.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/index';
import { metaReducer } from './reducers';


const ROUTES = [
    { path: '', component: UserFollowersComponent }    
];

const COMPONENTS = [
    UserFollowersComponent,
    FollowerModalComponent,
    UserFollowerContentComponent
];

const EFFECTS = [
    FollowersEffects,
];

const PROVIDERS = [
    UserFollowerService,
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        StoreModule.forFeature('userfollowers', reducers, {metaReducers: metaReducer}),
        EffectsModule.forFeature(EFFECTS),
        RouterModule.forChild(ROUTES),
      ],
      declarations: COMPONENTS,
      exports: COMPONENTS,
      providers: PROVIDERS,
      entryComponents:[
          UserFollowerContentComponent
      ]
})
export class UserFollowersModule {}
