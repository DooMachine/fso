import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as addpostActions from '../actions/addnewpost';
import { State } from '../reducers/addnewpost';
import { AddNewPostService } from '../services/addnewpost.service';
import { selectPost } from '../reducers/index';
import { PostPartImageService } from '../services/postpartimage.service';
import {ShowProgressBar, HideProgressBar } from '../../core/actions/index';
import { Router } from '@angular/router';
import { HideComments } from '../../post/actions/reviews';

@Injectable()
export class AddNewPostEffects {
    @Effect() onGetUnpublishedPost$: Observable<Action> =
    this.actions$.ofType<addpostActions.GetUnpublishedPost>(addpostActions.AddNewPostActionTypes.GET_UNPUBLISHED_POST)
    .switchMap((action) => {
        return this.addNewPostService
        .GetUserUnpublishedPost()
        .map(data => {
            return new addpostActions.GetUnpublishedPostSuccess(data.value);
          })
          .catch((error) => {
            return Observable.of(
              new addpostActions.GetUnpublishedPostFail({error:error})
            );
          });
    });
    @Effect() onGetAutoCompleteInterests$: Observable<Action> =
    this.actions$.ofType<addpostActions.GetAutoCompleteInterests>(addpostActions.AddNewPostActionTypes.GET_AUTOCOMPLETE_INTEREST)
    .switchMap((action) => {
        return this.addNewPostService
        .GetAutoCompleteInterests(action.payload.query,action.payload.pageSize)
        .map(data => {
            return new addpostActions.GetAutoCompleteInterestsSuccess(data.value);
          })
          .catch((error) => {
            return Observable.of(
              new addpostActions.GetAutoCompleteInterestsSuccessFail({error:error})
            );
          });
    });
    @Effect() onSubmitPost$: Observable<Action> =
    this.actions$.ofType<addpostActions.SubmitForm>(addpostActions.AddNewPostActionTypes.SUBMIT_FORM)
    .withLatestFrom(this.store.select(store=> store['auth'].userData.nickname))
    .switchMap(([action,username]) => {
        return this.addNewPostService
        .PublishPost(action.payload)
        .map(data => {
            if(!data.value.isActionSucceed){
              return new addpostActions.SubmitFormFail({error:data.value.errorInformation.userInformation});
            }else{
              this.router.navigate(['/post',data.value.publishedPostId]);
              return new addpostActions.SubmitFormSuccess(data.value);
            }
          })
          .catch((error) => {
            return Observable.of(
              new addpostActions.SubmitFormFail({error:error})
            );
          });
    });

    @Effect() onAddPost$: Observable<Action> =
    this.actions$.ofType<addpostActions.AddPostPart>(addpostActions.AddNewPostActionTypes.ADD_POSTPART)
    .withLatestFrom(this.store.select(p => p['addnewpost'].addPostState))
    .switchMap(([action, store]) => {
        return this.addNewPostService
        .AddPostPart(store.post.id)
        .map(data => {

            return new addpostActions.AddPostPartSuccess({ret: data.value, file: action.payload.file});
          })
          .catch((error) => {
            return Observable.of(
              new addpostActions.AddPostPartFail({error:error})
            );
          });
    });
    @Effect() onAddPostpart$: Observable<Action> =
    this.actions$.ofType<addpostActions.AddPostPart>(addpostActions.AddNewPostActionTypes.ADD_POSTPART)
    .switchMap((action) =>{ return Observable.of(new ShowProgressBar())});

    @Effect() onPPImgSuccess$: Observable<Action> =
    this.actions$.ofType<addpostActions.SetPostPartImageSuccess>(addpostActions.AddNewPostActionTypes.SET_POSTPART_IMAGE_SUCCESS)
    .switchMap((action) =>{ return Observable.of(new HideProgressBar())});

    @Effect() onPPImgFail$: Observable<Action> =
    this.actions$.ofType<addpostActions.SetPostPartImageFail>(addpostActions.AddNewPostActionTypes.SET_POSTPART_IMAGE_FAIL)
    .switchMap((action) =>{ return Observable.of(new HideProgressBar())});

    @Effect() onAddPostSuccess$: Observable<Action> =
    this.actions$.ofType<addpostActions.AddPostPartSuccess>(addpostActions.AddNewPostActionTypes.ADD_POSTPART_SUCCESS)
    .withLatestFrom(this.store.select(p => p['addnewpost'].addPostState))
    .switchMap(([action, store]) => {
        return this.postpartImageService
        .UpdatePostPart(action.payload.file, action.payload.ret.postPartId)
        .map(data => {
            
            return new addpostActions.SetPostPartImageSuccess(data.value);
          })
          .catch((error) => {
            return Observable.of(
              new addpostActions.SetPostPartImageFail({error:error})
            );
          });
    });
    @Effect() onRemovePostPart$: Observable<Action> =
    this.actions$.ofType<addpostActions.RemovePostPart>(addpostActions.AddNewPostActionTypes.REMOVE_POSTPART)
    
    .switchMap((action) => {
        return this.addNewPostService
        .RemovePostPart(action.payload.postPartId)
        .map(data => {
            console.log(data);
            if(data.value.isActionSucceed){
                return new addpostActions.RemovePostPartSuccess({ret: data.value, postPartId: action.payload.postPartId});
            }else{
                return new addpostActions.RemovePostPartFail();
            }
            
          })
          .catch((error) => {
            return Observable.of(
              new addpostActions.RemovePostPartFail({error:error})
            );
          });
    });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private router: Router,
        private addNewPostService: AddNewPostService,
        private postpartImageService: PostPartImageService
    ) {}
}
