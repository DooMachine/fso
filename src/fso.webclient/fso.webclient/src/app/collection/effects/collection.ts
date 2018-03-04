import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as fromCore from '../../core/actions';
import { State } from '../../reducers';
import { CollectionService } from '../services/collection.service';
import { PostLikeService } from '../../shared/services/postlike.service';
import { UserFollowService } from '../../shared/services/userfollow.service';
import { SEOService } from '../../shared/services/seo.service';
import * as collectionActions from '../actions/collection';
import * as postActions from '../actions/post';

@Injectable()
export class PostCollectionEffects {
    constructor(
        private actions$: Actions,
        private _collectionService: CollectionService,
        private store: Store<State>,
        private seoService: SEOService,
        private postLikeService: PostLikeService,
        private userFollowService:UserFollowService
    ) {}

    @Effect()
    onRequestCollection$: Observable<Action> =
    this.actions$.ofType<collectionActions.GetCollection>(collectionActions.CollectionActionTypes.GET_COLLECTION)
    .withLatestFrom(this.store.select(p => p['collection']))
    .switchMap(([action, state]) => {
        if(state.collection['collection'].id === action.payload.id){
            return Observable.of({type:"NO_ACTION"});
        }
        this.store.dispatch({type:"CLEAR_COLLECTION_STATE"});        
        return this._collectionService
        .GetCollectionIndex(action.payload.id,state.posts.pageIndex,state.posts.pageSize)
        .switchMap(resp => {
            this.seoService.updateCollectionPage(resp);
            return Observable.from(
                [
                    new collectionActions.GetCollectionSuccess(resp.collection),
                    new postActions.GetPostSuccessAction(resp.posts)
                ]);
        });
    });

    @Effect() onUserLikePost$: Observable<Action> =
    this.actions$.ofType<postActions.LikeCollectionPostAction>(postActions.CollectionPostActionTypes.LIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .LikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new postActions.LikePostSuccessAction({isLiked: data.value.isLiked, id:action.payload.id });
            }else{
                new postActions.LikePostFailAction({isLiked: data.value.isLiked, id:action.payload.id })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new postActions.LikePostFailAction({isLiked: false, id:action.payload.id })
            );
          });
    });
    @Effect() onUserUnlikePost$: Observable<Action> =
    this.actions$.ofType<postActions.UnLikeCollectionPostAction>(postActions.CollectionPostActionTypes.UNLIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .UnlikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new postActions.UnLikePostSuccessAction({isLiked: false, id:action.payload.id });
            }else{
                new postActions.UnLikePostFailAction({isLiked: true })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new postActions.UnLikePostFailAction({isLiked: true, id:action.payload.id })
            );
          });
    });
    
}
