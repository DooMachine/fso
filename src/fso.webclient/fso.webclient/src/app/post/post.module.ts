import { NgModule, ModuleWithProviders } from '@angular/core';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PostService } from './services/post.service';
import { MaterialModule } from '../material/index';
import { reducers, metaReducer } from './reducers';
import { PostEffects } from './effects/post';
import { PostComponent } from './containers/post.container';
import { PostPostpartsComponent } from './components/post-postparts/post-postparts.component';
import { PostReviewsComponent } from './components/post-reviews/post-reviews.component';
import { PostSimiliarpostsComponent } from './components/post-similiarposts/post-similiarposts.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostPostpartGridComponent } from './components/post-postpart-grid/post-postpart-grid.component';
import { SharedModule } from '../shared/shared.module';
import { PostAddreviewComponent } from './containers/post-addreview/post-addreview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReviewEffects } from './effects/addreview';
import { AddReviewService } from './services/review.service';
import { PostReviewLikeEffects } from './effects/review';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PostReviewCommentsComponent } from './components/post-review-comments/post-review-comments.component';
import { PostReviewAddcommentComponent } from './components/post-review-addcomment/post-review-addcomment.component';
import { PostCommentEffects } from './effects/comment';
import { PostActionsComponent } from './components/post-actions/post-actions.component';
import { PostGroupsComponent } from './components/post-groups/post-groups.component';

const COMPONENTS = [
    PostComponent,
    PostReviewsComponent,
    PostSimiliarpostsComponent,
    PostPostpartsComponent,
    PostDetailsComponent,
    PostPostpartGridComponent,
    PostAddreviewComponent,
    PostReviewCommentsComponent,
    PostReviewAddcommentComponent,
    PostActionsComponent,
    PostGroupsComponent
];
declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: "pan-x pan-y",      
    });
    return mc;
  }
}

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        StoreModule.forFeature('post', reducers, {metaReducers: metaReducer}),
        EffectsModule.forFeature([PostEffects,AddReviewEffects,PostReviewLikeEffects,PostCommentEffects]),
        RouterModule.forChild([
            { path: '', component: PostComponent, pathMatch: 'full' },
            { path: ':id/review/:reviewId', component: PostComponent },
            { path: ':id', component: PostComponent,
                children:[{
                  path:'addreview', canActivate:[AuthGuard], component:PostAddreviewComponent
                },
              ]},
        ]),
      ],
      declarations: COMPONENTS,
      exports: COMPONENTS,
      providers: [PostService, AddReviewService, 
        { 
        provide: HAMMER_GESTURE_CONFIG, 
        useClass: MyHammerConfig 
        }]
})
export class PostModule {}
