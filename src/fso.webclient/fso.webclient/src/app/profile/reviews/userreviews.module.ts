import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { ReviewEffects } from './effects/review';

import { reducers, metaReducer } from './reducers';
import { UserReviewService } from './services/review.service';
import { UserReviewComponent } from './containers/user-review.container';
import { UserReviewsListComponent } from './components/user-reviews-list/user-reviews-list.component';
import { UserReviewItemComponent } from './components/user-review/user-review.component';
import { MaterialModule } from '../../material/index';
import { SharedModule } from '../../shared/shared.module';
import { PostEffects } from './effects/post';


const ROUTES = [
    { path: '', component: UserReviewComponent }    
];

const COMPONENTS = [
    UserReviewComponent,
    UserReviewsListComponent,
    UserReviewItemComponent
];

const EFFECTS = [
    ReviewEffects,
    PostEffects
];

const PROVIDERS = [
    UserReviewService,
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        StoreModule.forFeature('userreviews', reducers,{metaReducers: metaReducer}),
        EffectsModule.forFeature(EFFECTS),
        RouterModule.forChild(ROUTES),
      ],
      declarations: COMPONENTS,
      exports: COMPONENTS,
      providers: PROVIDERS
})
export class UserReviewsModule {}
