import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InterestService } from './services/interest.service';
import { MaterialModule } from '../material/index';
import { reducers, metaReducer } from './reducers';
import { InterestEffects } from './effects/interest';
import { InterestComponent } from './containers/interest.container';
import { SharedModule } from '../shared/shared.module';
import { InterestDetailComponent } from './components/interest-detail/interest-detail.component';
import { InterestTabsComponent } from './components/interest-tabs/interest-tabs.component';
import { SimiliarInterestsComponent } from './components/similiar-interests/similiar-interests.component';
import { InterestRanklistComponent } from './components/interest-ranklist/interest-ranklist.component';
import { InterestActionService } from './services/interestaction.service';
import { InterestHomeComponent } from './containers/interesthome.container';
import { AuthGuard } from '../auth/guards/auth.guard';
import { InterestNeedReviewComponent } from './containers/interestneedreview.container';
import { InterestTrendingComponent } from './containers/interesttrending.container';
import { InterestUsersComponent } from './containers/interestusers.container';
import { InterestPostEffects } from './effects/post';

const COMPONENTS = [
    InterestComponent,
    InterestDetailComponent,
    InterestRanklistComponent,
    InterestTabsComponent,
    SimiliarInterestsComponent,
    InterestNeedReviewComponent,
    InterestHomeComponent,
    InterestTrendingComponent,
    InterestUsersComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('interest', reducers, {metaReducers: metaReducer}), 
    EffectsModule.forFeature([InterestEffects,InterestPostEffects]),
    RouterModule.forChild([
        { path: '', component: InterestComponent,
        children: [
          {path: '', component: InterestHomeComponent},
          {path: 'community' , canActivate: [AuthGuard], loadChildren: 'app/interest/community/community.module#CommunityModule'},
          {path: 'trending' , loadChildren: 'app/interest/trending/interesttrending.module#InterestTrendingModule'},
          {path: 'needreview', canActivate:  [AuthGuard], loadChildren: 'app/interest/needreview/needreview.module#NeedReviewModule'}
          
      ]
      }    
    ]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [InterestService,InterestActionService]
})
export class InterestModule {}

