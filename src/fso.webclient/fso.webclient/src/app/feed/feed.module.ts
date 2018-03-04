import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FavouritePostComponent } from './feed-item-components/favourite-post/favourite-post.component';
import { ActivityReviewPostComponent } from './feed-item-components/review-post/review-post.component';
import { ActivityLikeReviewComponent } from './feed-item-components/like-review/like-review.component';
import { CommentReviewComponent } from './feed-item-components/comment-review/comment-review.component';
import { AddCollectionComponent } from './feed-item-components/add-collection/add-collection.component';
import { AddPostActivityComponent } from './feed-item-components/add-post/add-post.component';
import { AddPostCollectionComponent } from './feed-item-components/add-post-collection/add-post-collection.component';
import { FollowGroupComponent } from './feed-item-components/follow-group/follow-group.component';
import { MaterialModule } from '../material/index';
import { SharedModule }from '../shared/shared.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  FeedListComponent,
  FavouritePostComponent,
  ActivityReviewPostComponent,
  ActivityLikeReviewComponent,
  CommentReviewComponent,
  AddCollectionComponent,
  AddPostActivityComponent,
  AddPostCollectionComponent,
  FollowGroupComponent]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ],
  exports: [COMPONENTS],
  declarations: [COMPONENTS]
})
export class FeedModule { }
