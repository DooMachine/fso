import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../material/index';
import { reducers, metaReducer } from './reducers';
import { SharedModule } from '../../shared/shared.module';
import { InterestCommunityComponent } from './containers/community.container';
import { CommunityEffects } from './effects/followers';
import { CommunityUserListComponent } from './components/community-user-list/community-user-list.component';

export const COMPONENTS = [
    InterestCommunityComponent,
    CommunityUserListComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('community', reducers, {metaReducers: metaReducer}), 
    EffectsModule.forFeature([CommunityEffects]),
    RouterModule.forChild([
      { path: '',component: InterestCommunityComponent},
    ]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CommunityModule {}

