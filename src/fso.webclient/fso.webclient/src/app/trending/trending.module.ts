import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrendingContainer } from './containers/trending.container';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TrendingInterestService } from "./services/interest.service";
import { TrendingInterestEffects } from "./effects/interest";
import { TrendingPostEffects } from "./effects/post";
import { reducers } from './reducers';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('trending', reducers),
    EffectsModule.forFeature([TrendingInterestEffects,TrendingPostEffects]),
    RouterModule.forChild([
      { path: '', component: TrendingContainer, pathMatch: 'full' },
    ]),
  ],
  declarations: [TrendingContainer],
  providers: [TrendingInterestService]
})
export class TrendingModule { }
