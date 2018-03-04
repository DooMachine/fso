import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as popActions from '../actions/popularposts';
import { State } from '../reducers/popularposts';
import { UserPopularPostsService } from '../services/popularposts.service';

@Injectable()
export class PopularPostsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private userPostService: UserPopularPostsService
    ) {}

    @Effect() onGetUserPostsRequest$: Observable<Action> =
    this.actions$.ofType<popActions.GetPopularPostsAction>(popActions.PopularPostsActionTypes.GET_POPULARPOSTS)
    .withLatestFrom(this.store.select(p => p['profile']))
    .switchMap(([action, store]) => {
        return this.userPostService
        .GetUserBestPosts(action.payload.userName, store.bestPosts.pageSize)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            return new popActions.GetPopularPostsSuccessAction(data.value.posts);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new popActions.GetPopularPostsFailAction({showError: true})
            );
          });
    });

    
}
