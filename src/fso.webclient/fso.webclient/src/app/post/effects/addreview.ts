import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as addReviewActions from '../actions/addreview';
import * as reviewActions from '../actions/reviews';
import * as postPartActions from '../actions/postparts';
import {ShowProgressBar,HideProgressBar} from '../../core/actions/index';
import * as fromCore from '../../core/actions';
import { State } from '../reducers';
import { PostService } from '../services/post.service';
import { PostLikeService } from '../../shared/services/postlike.service';
import { UserFollowService } from '../../shared/services/userfollow.service';
import { AddReviewService } from '../services/review.service';


@Injectable()
export class AddReviewEffects {
    constructor(
        private actions$: Actions, 
        private addReviewService: AddReviewService,
        private store: Store<State>
    ) {}

    @Effect()
    onSubmitReview$: Observable<Action> =
    this.actions$.ofType<addReviewActions.SubmitForm>(addReviewActions.AddReviewActionTypes.SUBMIT_FORM)
    .withLatestFrom(this.store.select(p => p['post'].post['post'].id))
    .switchMap(([action, postId]) => {
        const formBody = {...action.payload,postId:postId};
        return this.addReviewService
            .PublishReview(formBody)
            .map((resp) => {
                let error;
                let showForm;
                let obs;
                if(resp.isActionSucceed){    
                    showForm = false;                
                    return new addReviewActions.SubmitFormSuccess({error: error,showForm: showForm,review:resp.review})                      
                }else{   
                    showForm = true;                 
                    return new addReviewActions.SubmitFormFail({error: resp.errorInformation.userInformation,showForm: true})                      
                }                 
            })
            .catch((error) => {
                return Observable.of(
                  new addReviewActions.SubmitFormFail({error: "Oops an error occured"})
                );
            });
    });


    @Effect()
    onReviewFail$: Observable<Action> =
    this.actions$.ofType<addReviewActions.SubmitFormFail>(addReviewActions.AddReviewActionTypes.SUBMIT_FORM_FAIL)
    .switchMap((action) => {
        return Observable.of(new fromCore.ShowSnackBarAction({message:action.payload.error,action:null,config:{duration:6000}}));        
    });

    @Effect()
    onReviewSuccess$: Observable<Action> =
    this.actions$.ofType<addReviewActions.SubmitFormSuccess>(addReviewActions.AddReviewActionTypes.SUBMIT_FORM_SUCCESS)
    .switchMap((action) => {
        return Observable.of(new reviewActions.AddReviews({entities:[action.payload.review]}));        
    });

    @Effect()
    onSubmitReviewShowProgressBar$: Observable<Action> =
    this.actions$.ofType<addReviewActions.SubmitForm>(addReviewActions.AddReviewActionTypes.SUBMIT_FORM)
    .switchMap((action) => {
        return Observable.of(new ShowProgressBar());        
    });
    @Effect()
    onSubmitReviewSuccessHideProgressBar$: Observable<Action> =
    this.actions$.ofType<addReviewActions.SubmitFormSuccess>(addReviewActions.AddReviewActionTypes.SUBMIT_FORM_SUCCESS)
    .switchMap((action) => {
        return Observable.of(new HideProgressBar());        
    });
    @Effect()
    onSubmitReviewFailHideProgressBar$: Observable<Action> =
    this.actions$.ofType<addReviewActions.SubmitFormFail>(addReviewActions.AddReviewActionTypes.SUBMIT_FORM_FAIL)
    .switchMap((action) => {
        return Observable.of(new HideProgressBar());        
    });
}
