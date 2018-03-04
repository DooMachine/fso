import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { UserActivityService } from './services/userActivity.service';
import { UserInfoService } from './services/userinfo.service';
import { UserInterestService } from './services/interest.service';


import { UserInterestEffects } from './effects/interest';
import { UserActivityEffects } from './effects/userActivity';
import { UserInfoEffects } from './effects/user';
import { UserLikeEffects } from './effects/userlike';

import { MaterialModule } from '../material';
import { reducers, metaReducer } from './reducers';

import { UserComponent } from './containers/user.container';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserTabComponent } from './components/user-tab/user-tab.component';
import { UserActivityComponent } from './containers/user-activity.container';

import { UserInterestComponent } from './containers/user-interests.container';
import { UserInterestListComponent } from './components/user-interest/user-interest.component';
import { UserPopularPostListComponent } from './components/user-popularposts/user-popularposts.component';
import { UserPopularPostsComponent } from './containers/user-post-best.container';
import { PopularPostsEffects } from './effects/popularposts';
import { FeedModule } from '../feed/feed.module';
import { UserInterestSmallComponent } from './components/user-interest-small/user-interest-small.component';
import { ReviewLikeEffects } from './effects/reviewlike';
import { UserPopularPostsService } from './services/popularposts.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SharedModule } from '../shared/shared.module';

const ROUTES = [
    { path: '', component: UserComponent , pathMatch: 'full'},    
    { path: ':userName', component: UserComponent,
    children: [
        {path: '', component: UserActivityComponent},
        {path: 'reviews', canActivate: [AuthGuard], loadChildren: 'app/profile/reviews/userreviews.module#UserReviewsModule'},
        {path: 'favourites', canActivate: [AuthGuard], loadChildren: 'app/profile/favourites/userfavourites.module#UserFavouritesModule'},
        {path: 'posts', canActivate: [AuthGuard], loadChildren: 'app/profile/posts/userposts.module#UserPostsModule'},
        {path: 'followers', canActivate: [AuthGuard], loadChildren: 'app/profile/followers/userfollowers.module#UserFollowersModule'},
        {path: 'collections', canActivate: [AuthGuard], loadChildren: 'app/profile/collections/usercollections.module#UserCollectionsModule'},
        {path: 'following' , canActivate: [AuthGuard], loadChildren: 'app/profile/following/userfollowing.module#UserFollowingsModule'},
        {path: 'collections/:id' , loadChildren: 'app/collection/collection.module#CollectionModule'},
    ]
    }
];

const COMPONENTS = [
    UserComponent,
    UserInfoComponent,
    UserTabComponent,
    UserActivityComponent,
    UserInterestComponent,
    UserInterestListComponent,
    UserInterestSmallComponent,
    UserPopularPostsComponent,
    UserPopularPostListComponent
];

const EFFECTS = [
    UserActivityEffects,
    UserInterestEffects,
    PopularPostsEffects,
    UserInfoEffects,
    UserLikeEffects,
    ReviewLikeEffects
];

const PROVIDERS = [
    UserActivityService,
    UserInfoService,
    UserInterestService,
    UserPopularPostsService
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        FeedModule,
        StoreModule.forFeature('profile', reducers, {metaReducers: metaReducer}),
        EffectsModule.forFeature(EFFECTS),
        RouterModule.forChild(ROUTES),
      ],
      declarations: COMPONENTS,
      exports: COMPONENTS,
      providers: PROVIDERS
})
export class ProfileModule {}
