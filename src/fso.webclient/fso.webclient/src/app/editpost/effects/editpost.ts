import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/concatMap'
import * as editpostActions from '../actions/editpost';
import { State } from '../reducers/editpost';
import { EditPostService } from '../services/editpost.service';
import { selectPost } from '../reducers/index';
import { PostPartImageService } from '../services/postpartimage.service';
import { ShowProgressBar, HideProgressBar } from '../../core/actions/index';
import { Router } from '@angular/router';
import { HideComments } from '../../post/actions/reviews';

@Injectable()
export class EditPostEffects {
    @Effect() onGetUnpublishedPost$: Observable<Action> =
    this.actions$.ofType<editpostActions.GetEditingPost>(editpostActions.EditPostActionTypes.GET_EDITING_POST)
    .switchMap((action) => {
        return this.editPostService
        .GetEditingPost(action.payload.postId)
        .map(data => {
            return new editpostActions.GetEditingPostSuccess(data)                  
          })
          .catch((error) => {
            return Observable.of(
              new editpostActions.GetEditingPostFail({error:error})
            );
          });
    });
    @Effect() onGetAutoCompleteInterests$: Observable<Action> =
    this.actions$.ofType<editpostActions.GetAutoCompleteInterests>(editpostActions.EditPostActionTypes.GET_AUTOCOMPLETE_INTEREST)
    .switchMap((action) => {
        return this.editPostService
        .GetAutoCompleteInterests(action.payload.query,action.payload.pageSize)
        .map(data => {
            return new editpostActions.GetAutoCompleteInterestsSuccess(data.value);
          })
          .catch((error) => {
            return Observable.of(
              new editpostActions.GetAutoCompleteInterestsSuccessFail({error:error})
            );
          });
    });
    @Effect() onSubmitPost$: Observable<Action> =
    this.actions$.ofType<editpostActions.SubmitForm>(editpostActions.EditPostActionTypes.SUBMIT_FORM)
    .withLatestFrom(this.store.select(store=> store['editpost']))
    .switchMap(([action,store]) => {
      console.log(action.payload);
        // action.payload.selectedInterestIds = store.editPostState.post.selectedInterestIds;
        return this.editPostService
        .SaveEditingPost(action.payload)
        .concatMap(data => {
            if(!data.isActionSucceed){
              return Observable.from([
                new editpostActions.SubmitFormFail({error:data.errors.custom})
              ]);
            }else{
              this.router.navigate(['/post',data.publishedPostId]);
              return Observable.from([
                {type:'CLEAR_POST_STATE'},
                new editpostActions.SubmitFormSuccess(data)]
              );
            }
          })
          .catch((error) => {
            return Observable.of(
              new editpostActions.SubmitFormFail({error:error})
            );
          });
    });

    @Effect() onAddPostPart$: Observable<Action> =
    this.actions$.ofType<editpostActions.AddPostPart>(editpostActions.EditPostActionTypes.ADD_POSTPART)
    .withLatestFrom(this.store.select(p => p['editpost'].editPostState))
    .switchMap(([action, store]) => {
        return this.editPostService
        .AddPostPart(store.post.id)
        .map(data => {
            return new editpostActions.AddPostPartSuccess({ret: data.value, file: action.payload.file});
          })
          .catch((error) => {
            return Observable.of(
              new editpostActions.AddPostPartFail({error:error})
            );
          });
    });
    @Effect() onAddPostpart$: Observable<Action> =
    this.actions$.ofType<editpostActions.AddPostPart>(editpostActions.EditPostActionTypes.ADD_POSTPART)
    .switchMap((action) =>{ return Observable.of(new ShowProgressBar())});

    @Effect() onPPImgSuccess$: Observable<Action> =
    this.actions$.ofType<editpostActions.SetPostPartImageSuccess>(editpostActions.EditPostActionTypes.SET_POSTPART_IMAGE_SUCCESS)
    .switchMap((action) =>{ return Observable.of(new HideProgressBar())});

    @Effect() onPPImgFail$: Observable<Action> =
    this.actions$.ofType<editpostActions.SetPostPartImageFail>(editpostActions.EditPostActionTypes.SET_POSTPART_IMAGE_FAIL)
    .switchMap((action) =>{ return Observable.of(new HideProgressBar())});

    @Effect() onAddPostSuccess$: Observable<Action> =
    this.actions$.ofType<editpostActions.AddPostPartSuccess>(editpostActions.EditPostActionTypes.ADD_POSTPART_SUCCESS)
    .withLatestFrom(this.store.select(p => p['editpost'].editPostState))
    .switchMap(([action, store]) => {
        return this.postpartImageService
        .UpdatePostPart(action.payload.file, action.payload.ret.postPartId)
        .map(data => {
            
            return new editpostActions.SetPostPartImageSuccess(data.value);
          })
          .catch((error) => {
            return Observable.of(
              new editpostActions.SetPostPartImageFail({error:error})
            );
          });
    });
    @Effect() onRemovePostPart$: Observable<Action> =
    this.actions$.ofType<editpostActions.RemovePostPart>(editpostActions.EditPostActionTypes.REMOVE_POSTPART)
    
    .switchMap((action) => {
        return this.editPostService
        .RemovePostPart(action.payload.postPartId)
        .map(data => {
            console.log(data);
            if(data.value.isActionSucceed){
                return new editpostActions.RemovePostPartSuccess({ret: data.value, postPartId: action.payload.postPartId});
            }else{
                return new editpostActions.RemovePostPartFail();
            }
            
          })
          .catch((error) => {
            return Observable.of(
              new editpostActions.RemovePostPartFail({error:error})
            );
          });
    });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private router: Router,
        private editPostService: EditPostService,
        private postpartImageService: PostPartImageService
    ) {}
}
