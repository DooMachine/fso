import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as favouritesActions from '../actions/favourites';
import { State } from '../reducers';
import { UserFavouriteService } from '../services/user.favourites.service';
import { PostLikeService } from '../../../shared/services/postlike.service';

@Injectable()
export class FavouriteEffects {
    @Effect() onGetUserPostsRequest$: Observable<Action> =
    this.actions$.ofType<favouritesActions.GetFavouritesAction>(favouritesActions.FavouritesActionTypes.GET_FAVOURITES)
    .withLatestFrom(this.store.select(store => store['userfavourites']))
    .switchMap(([action, store]) => {
        return this.userFavouritesService
        .GetUserFavourites(action.payload.userName, store.favourites.pageIndex, 
            store.favourites.pageSize, store.favourites.order)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            return new favouritesActions.GetFavouritesSuccessAction(data);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new favouritesActions.GetFavouritesFailAction({error: error})
            );
          });
    });
    @Effect() onUserLikePost$: Observable<Action> =
    this.actions$.ofType<favouritesActions.LikePostAction>(favouritesActions.FavouritesActionTypes.LIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .LikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new favouritesActions.LikePostSuccessAction({isLiked: data.value.isLiked, id:action.payload.id });
            }else{
                new favouritesActions.LikePostFailAction({isLiked: data.value.isLiked, id:action.payload.id })
            }
          })
          .catch((error) => {
            return Observable.of(
              new favouritesActions.LikePostFailAction({isLiked: false, id:action.payload.id })
            );
          });
    });
    @Effect() onUserUnlikePost$: Observable<Action> =
    this.actions$.ofType<favouritesActions.UnLikePostAction>(favouritesActions.FavouritesActionTypes.UNLIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .UnlikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new favouritesActions.UnLikePostSuccessAction({isLiked: false, id:action.payload.id });
            }else{
                new favouritesActions.UnLikePostFailAction({isLiked: true })
            }
          })
          .catch((error) => {
            return Observable.of(
              new favouritesActions.UnLikePostFailAction({isLiked: true, id:action.payload.id })
            );
          });
    });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private postLikeService:PostLikeService,
        private userFavouritesService: UserFavouriteService   
    ) {}
}
