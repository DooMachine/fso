import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/observable/from';
import * as feedActivityActions from '../actions/activityfeed';
import { GetGroupRecommendationSuccessAction } from '../actions/grouprecommendation';
import { GetUserRecommendationSuccessAction } from '../actions/userrecommendation';
import { State } from '../../reducers';
import { FeedService } from '../services/feed.service';
import { ReviewLikeService } from '../../shared/services/reviewlike.service';
import { PostLikeService } from '../../shared/services/postlike.service';
import { OAuthService } from "angular-oauth2-oidc";

@Injectable()
export class HomeFeedEffects {
    @Effect() onGetFeed$: Observable<Action> =
    this.actions$.ofType<feedActivityActions.GetFeedAction>(feedActivityActions.ActivityFeedActionTypes.GET_FEED)
    .withLatestFrom(this.store.select(p => p['home']))
    .switchMap(([action, store]) => {
        
        return this.feedService
        .GetFeed(
            store.activityFeed.pageIndex,store.activityFeed.pageSize,store.activityFeed.order,
            store.userrecommendation.pageIndex,store.userrecommendation.pageSize,store.userrecommendation.order,
            store.grouprecommendation.pageIndex,store.grouprecommendation.pageSize,store.grouprecommendation.order,
         )
        .switchMap(data => {
            return Observable.from([  
                new feedActivityActions.GetFeedSuccessAction(data.friendActivities),
                new GetGroupRecommendationSuccessAction(data.groupRecommendations),
                new GetUserRecommendationSuccessAction(data.userRecommeandations)
            ]);
          })
          .catch((error) => {
            return Observable.of(
              new feedActivityActions.GetFeedFailAction({showError: true})
            );
          });
    });

    @Effect() onUserLikeReview$: Observable<Action> =
     this.actions$.ofType<feedActivityActions.LikeReviewAction>(feedActivityActions.ActivityFeedActionTypes.LIKE_REVIEW)    
     .switchMap((action) => {
         return this.reviewLikeService
         .LikeReview(action.payload.id)
         .map(data => {
             if(data.value.isActionSucceed){
                 return new feedActivityActions.LikeReviewSuccessAction
                 ({likeStatus: data.value.likeStatus, activityId: action.payload.activityId});
             }else{
                 return new feedActivityActions.LikeReviewFailAction({likeStatus: data.value.likeStatus, activityId: action.payload.activityId})
             }            
           })
           .catch((error) => {
             return Observable.of(
               new feedActivityActions.LikeReviewFailAction({likeStatus: 2, activityId: action.payload.activityId})
             );
           });
     });
     
    @Effect() onUserUnlikeReview$: Observable<Action> =
    this.actions$.ofType<feedActivityActions.UnLikeReviewAction>(feedActivityActions.ActivityFeedActionTypes.UNLIKE_REVIEW)    
    .switchMap((action) => {
        return this.reviewLikeService
        .UnlikeReview(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new feedActivityActions.UnLikeReviewSuccessAction({likeStatus: data.value.likeStatus, activityId: action.payload.activityId});
            }else{
                return new feedActivityActions.UnLikeReviewFailAction({likeStatus: data.value.likeStatus, activityId: action.payload.activityId})
            }            
          })
          .catch((error) => {
            return Observable.of(
              new feedActivityActions.UnLikeReviewFailAction({likeStatus: 0, activityId: action.payload.activityId})
            );
          });
    });
    
    @Effect() onUserDislikeReview$: Observable<Action> =
    this.actions$.ofType<feedActivityActions.DislikeReviewAction>(feedActivityActions.ActivityFeedActionTypes.DISLIKE_REVIEW)    
    .switchMap((action) => {
        return this.reviewLikeService
        .DislikeReview(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new feedActivityActions.DislikeReviewSuccessAction
                    ({likeStatus: data.value.likeStatus, activityId: action.payload.activityId});
            }else{
                return new feedActivityActions.DislikeReviewFailAction({likeStatus: data.value.likeStatus, activityId: action.payload.activityId})
            }            
          })
          .catch((error) => {
            return Observable.of(
                new feedActivityActions.DislikeReviewFailAction({likeStatus: 2, activityId: action.payload.activityId})
            );
          });
    });
    @Effect() onUserUndislikeReview$: Observable<Action> =
    this.actions$.ofType<feedActivityActions.UnDislikeReviewAction>(feedActivityActions.ActivityFeedActionTypes.UNDISLIKE_REVIEW)    
    .switchMap((action) => {
        return this.reviewLikeService
        .UndislikeReview(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new feedActivityActions.UnDislikeReviewSuccessAction
                    ({likeStatus: data.value.likeStatus, activityId: action.payload.activityId});
            }else{
                return new feedActivityActions.UnDislikeReviewFailAction({likeStatus: data.value.likeStatus, activityId: action.payload.activityId})
            }            
          })
          .catch((error) => {
            return Observable.of(
                new feedActivityActions.UnDislikeReviewFailAction({likeStatus: 2, activityId: action.payload.activityId})
            );
          });
    });

    @Effect() onUserLikePost$: Observable<Action> =
    this.actions$.ofType<feedActivityActions.LikePostAction>(feedActivityActions.ActivityFeedActionTypes.LIKE_POST)    
    .switchMap((action) => {
        console.log(action);
        return this.postLikeService
        .LikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new feedActivityActions.LikePostSuccessAction({isLiked: data.value.isLiked, activityId:action.payload.activityId });
            }else{
                new feedActivityActions.LikePostFailAction({isLiked: data.value.isLiked, activityId:action.payload.activityId })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new feedActivityActions.LikePostFailAction({isLiked: false, activityId:action.payload.activityId })
            );
          });
    });
    @Effect() onUserUnlikePost$: Observable<Action> =
    this.actions$.ofType<feedActivityActions.UnLikePostAction>(feedActivityActions.ActivityFeedActionTypes.UNLIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .UnlikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new feedActivityActions.UnLikePostSuccessAction({isLiked: false, activityId:action.payload.activityId });
            }else{
                new feedActivityActions.UnLikePostFailAction({isLiked: true, activityId:action.payload.activityId })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new feedActivityActions.UnLikePostFailAction({isLiked: true, activityId:action.payload.activityId })
            );
          });
    });

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private reviewLikeService:ReviewLikeService,
        private postLikeService:PostLikeService,
        private feedService:FeedService,
        private oauthService:OAuthService
    ) {}
}
