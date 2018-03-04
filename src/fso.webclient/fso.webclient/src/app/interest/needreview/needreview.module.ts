import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../material/index';
import { reducers, metaReducer } from './reducers';
import { SharedModule } from '../../shared/shared.module';
import { InterestNeedReviewComponent } from './containers/needreview.container';
import { NeedReviewEffects } from './effects/needreviews';

export const COMPONENTS = [
    InterestNeedReviewComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('needreview', reducers, {metaReducers: metaReducer}), 
    EffectsModule.forFeature([NeedReviewEffects]),
    RouterModule.forChild([
      { path: '',component: InterestNeedReviewComponent},
    ]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class NeedReviewModule {}

