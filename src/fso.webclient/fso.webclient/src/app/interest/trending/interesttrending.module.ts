import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../material/index';
import { reducers, metaReducer } from './reducers';
import { SharedModule } from '../../shared/shared.module';
import { InterestTrendingComponent } from './containers/interesttrending.container';
import { NeedReviewEffects } from './effects/post';

const COMPONENTS = [
    InterestTrendingComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('interesttrending', reducers, {metaReducers: metaReducer}), 
    EffectsModule.forFeature([NeedReviewEffects]),
    RouterModule.forChild([
      { path: '',component: InterestTrendingComponent},
    ]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class InterestTrendingModule {}

