import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/index';
import { reducers, metaReducer } from './reducers';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HomeComponent } from './containers/home.container';
import { FeedService } from './services/feed.service';
import { HomeFeedEffects } from './effects/activityfeed';
import { HomeFeedComponent } from './containers/homefeed.container';
import { HomeNoAuthComponent } from './containers/homenoauth.container';
import { FeedModule } from '../feed/feed.module';
import { HomeInterestsComponent } from './containers/homeinterests.container';
import { HomeInterestService } from './services/homeinterest.service';
import { HomeInterestEffects } from "./effects/interest";
import { FeedInterestListComponent } from "./components/feed-interestlist/feed-interestlist.component";
import { HomeMenuComponent } from "./components/home-menu/home-menu.component";
import { HomeUserRecommendationComponent } from "./containers/homerecommendation.container";
import { UserrecommendationListComponent } from "./components/userrecommendation-list/userrecommendation-list.component";
import { UserRecommendationEffects } from "./effects/userrecommendation";
import { GrouprecommendationListComponent } from "./components/grouprecommendation-list/grouprecommendation-list.component";
import { HomeGroupRecommendationComponent } from "./containers/homegrecommendation.container";
import { GroupRecommendationEffects } from "./effects/grouprecommendation";

const COMPONENTS = [
    HomeComponent,
    HomeFeedComponent,
    HomeNoAuthComponent,
    HomeInterestsComponent,
    FeedInterestListComponent,
    HomeUserRecommendationComponent,
    UserrecommendationListComponent,
    HomeGroupRecommendationComponent,
    GrouprecommendationListComponent,
    HomeMenuComponent 
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeedModule,
    
    MaterialModule,
    StoreModule.forFeature('home', reducers, {metaReducers: metaReducer}), 
    EffectsModule.forFeature([HomeFeedEffects,HomeInterestEffects,UserRecommendationEffects,GroupRecommendationEffects]),
    RouterModule.forChild([
      { path: '', component: HomeComponent, pathMatch: 'full'},          
    ]),
  ],
  declarations: COMPONENTS,
  providers: [FeedService, HomeInterestService]
})
export class HomeModule {}

