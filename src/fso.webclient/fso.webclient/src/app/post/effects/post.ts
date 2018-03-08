import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as postActions from '../actions/post';
import * as reviewActions from '../actions/reviews';
import * as postPartActions from '../actions/postparts';
import * as commentActions from '../actions/comments';
import * as similiarPostActions from '../actions/similiarposts';
import * as fromCore from '../../core/actions';
import { State } from '../reducers';
import { PostService } from '../services/post.service';
import { PostLikeService } from '../../shared/services/postlike.service';
import { UserFollowService } from '../../shared/services/userfollow.service';
import { SEOService } from '../../shared/services/seo.service';
import { Router } from '@angular/router';


@Injectable()
export class PostEffects {
    constructor(
        private actions$: Actions,
        private _postService: PostService,
        private router:Router,
        private store: Store<State>,
        private seoService: SEOService,
        private postLikeService: PostLikeService,
        private userFollowService:UserFollowService
    ) {}

    @Effect()
    onRequestPost$: Observable<Action> =
    this.actions$.ofType<postActions.GetPost>(postActions.PostActionTypes.GET_POST)
    .withLatestFrom(this.store.select(p => p['post'].post['post'].id))
    .switchMap(([action, postId]) => {
        // If id not changed dont fetch data
        let obs;
        if(postId == action.payload.postId ){
            obs= Observable.from([new postActions.SetLoading(false)]);
            return obs;
        }
        this.store.dispatch({type:"CLEAR_POST_STATE"});
        if(action.payload.reviewId){
            obs = this._postService
            .GetPostIndex(action.payload.postId,action.payload.reviewId)
            .switchMap(resp => {
                this.seoService.updatePostPage(resp.value.post);
                return Observable.from(
                    [                        
                        new postPartActions.SetPostParts(resp.value.post.postParts),
                        new postActions.GetPostSuccess(resp.value.post),
                        new reviewActions.SetReviews(resp.value.reviews),
                        new similiarPostActions.SetSimiliarPosts(resp.value.similiarPosts),
                    ]);
            });
            return obs;
        }
        obs = this._postService
        .GetPostIndex(action.payload.postId)
        .switchMap(resp => {
            this.seoService.updatePostPage(resp.value.post); 
            return Observable.from(
                [
                    new postPartActions.SetPostParts(resp.value.post.postParts),
                    new postActions.GetPostSuccess(resp.value.post),
                    new reviewActions.SetReviews(resp.value.reviews),
                    new similiarPostActions.SetSimiliarPosts(resp.value.similiarPosts),
                ]);
        });
        return obs;
    });

    @Effect()
    onRequestPostShowLoading$: Observable<Action> =
    this.actions$.ofType<postActions.GetPost>(postActions.PostActionTypes.GET_POST)
    .switchMap((action) => {
        return Observable.of(new fromCore.ShowProgressBar());
    });

    @Effect()
    onRequestPostHideLoading$: Observable<Action> =
    this.actions$.ofType<postActions.GetPostSuccess>(postActions.PostActionTypes.GET_POST_SUCCESS)
    .switchMap((action) => {
        return Observable.of(new fromCore.HideProgressBar());
    });

    @Effect() onUserLikeThePost$: Observable<Action> =
    this.actions$.ofType<postActions.LikePostAction>(postActions.PostActionTypes.LIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .LikePost(action.payload.id)
        .map(data => {            
            if(data.value.isActionSucceed){
                this.store.dispatch(new fromCore.ShowSnackBarAction({message:'Added to favourites',action:'',config:{duration:1700}}))
                return new postActions.LikePostSuccessAction({isLiked: data.value.isLiked});
            } else {
                new postActions.LikePostFailAction({isLiked: data.value.isLiked })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new postActions.LikePostFailAction({isLiked: false})
            );
          });
    });
    @Effect() onUserUnlikeThePost$: Observable<Action> =
    this.actions$.ofType<postActions.UnLikePostAction>(postActions.PostActionTypes.UNLIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .UnlikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new postActions.UnLikePostSuccessAction({isLiked: false });
            }else{
                new postActions.UnLikePostFailAction({isLiked: true})
            }            
          })
          .catch((error) => {
            return Observable.of(
              new postActions.UnLikePostFailAction({isLiked: true })
            );
          });
    });

    @Effect() onDeletePost$: Observable<Action> =
    this.actions$.ofType<postActions.DeletePost>(postActions.PostActionTypes.DELETE_POST)  
    .withLatestFrom(this.store.select(p=>p['auth'].userData.nickname))  
    .switchMap(([action,username]) => {
        return this._postService
        .DeletePost(action.payload)
        .switchMap(data => {
            if(data.isActionSucceed){
                this.router.navigate(['',username]);
                return Observable.from([
                    new postActions.DeletePostSuccess(),
                    new fromCore.ShowSnackBarAction({message:"Post deleted",action:null,config:{duration:3000}})
                ]);
            }else{
                return Observable.from([
                    new postActions.DeletePostSuccess(),
                    new fromCore.ShowSnackBarAction({message:"Post could not deleted, try again later",action:null,config:{duration:3400}})
                ]);
            }            
          })
          .catch((error) => {
            return Observable.from([
              new postActions.UnLikePostFailAction({isLiked: true })
            ]);
          });
    });

    @Effect() onFollowUser$: Observable<Action> =
    this.actions$.ofType<postActions.FollowUserAction>(postActions.PostActionTypes.FOLLOW_USER)
    .switchMap((action) => {
        return this.userFollowService.FollowUser(action.payload.username)
        .map(data => {
            return new postActions.FollowUserSuccessAction({username: action.payload.username,...data.value});
          })
          .catch((error) => {
            return Observable.of(
              new postActions.FollowUserFailAction({previousFollowState: action.payload.previousFollowState})
            );
          });
    });

    @Effect() onUnFollowUser$: Observable<Action> =
    this.actions$.ofType<postActions.UnfollowUserAction>(postActions.PostActionTypes.UNFOLLOW_USER)
    .switchMap((action) => {
        return this.userFollowService.UnfollowUser(action.payload.username)
        .map(data => {
            return new postActions.UnfollowUserSuccessAction({username: action.payload.username,...data.value});
          })
          .catch((error) => {
            return Observable.of(
              new postActions.UnfollowUserFailAction({previousFollowState: action.payload.previousFollowState})
            );
          });
    });
    
}
