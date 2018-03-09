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
import { PostDetailsComponent, AskIfSureDialogComponent } from './components/post-details/post-details.component';
import { PostPostpartGridComponent } from './components/post-postpart-grid/post-postpart-grid.component';
import { SharedModule } from '../shared/shared.module';
import { PostAddreviewComponent } from './containers/post-addreview/post-addreview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReviewEffects } from './effects/addreview';
import { AddReviewService } from './services/review.service';
import { PostReviewLikeEffects } from './effects/review';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PostActionsComponent } from './components/post-actions/post-actions.component';
import { PostGroupsComponent } from './components/post-groups/post-groups.component';
import { FeedModule } from '../feed/feed.module';

const COMPONENTS = [
    PostComponent,
    PostReviewsComponent,
    PostSimiliarpostsComponent,
    PostPostpartsComponent,
    PostDetailsComponent,
    PostPostpartGridComponent,
    PostAddreviewComponent,
    AskIfSureDialogComponent,
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
        FeedModule,
        ReactiveFormsModule,
        SharedModule,
        StoreModule.forFeature('post', reducers, {metaReducers: metaReducer}),
        EffectsModule.forFeature([PostEffects,AddReviewEffects,PostReviewLikeEffects]),
        RouterModule.forChild([
            { path: '', component: PostComponent, pathMatch: 'full' },
            { path: ':postId/review/:reviewId', component: PostComponent },
            { path: ':postId/review/:reviewId/c', component: PostComponent },
            { path: ':postId/review/:reviewId/c/:commentId', component: PostComponent },
            { path: ':postId', component: PostComponent,
                children:[{
                  path:'addreview', canActivate:[AuthGuard], component:PostAddreviewComponent
                },
              ]},
        ]),
      ],
      declarations: COMPONENTS,
      entryComponents:[AskIfSureDialogComponent],
      providers: [PostService, AddReviewService, 
        { 
        provide: HAMMER_GESTURE_CONFIG, 
        useClass: MyHammerConfig 
        }]
})
export class PostModule {}
