import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './containers/explore.container';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExploreService } from "./services/explore.service";
import { ExploreInterestEffects } from "./effects/interest";
import { reducers } from './reducers';
import { ExploreInterestListComponent } from './components/explore-interest-list/explore-interest-list.component';
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../material";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('explore', reducers),
    EffectsModule.forFeature([ExploreInterestEffects]),
    RouterModule.forChild([
      { path: '', component: ExploreComponent, pathMatch: 'full' },
    ]),
  ],
  declarations: [ExploreComponent, ExploreInterestListComponent],
  providers: [ExploreService]
})
export class ExploreModule { }
