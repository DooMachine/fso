import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as collectionActions from '../actions/collection';
import { State } from '../reducers';
import { UserCollectionService } from '../services/user.collection.service';
import { ShowProgressBar, HideProgressBar } from '../../../core/actions/index';

@Injectable()
export class CollectionEffects {
    @Effect() onGetUserCollectionsRequest$: Observable<Action> =
    this.actions$.ofType<collectionActions.GetCollectionAction>(collectionActions.CollectionActionTypes.GET_COLLECTIONS)
    .withLatestFrom(this.store.select(p => p['usercollections'].collections))
    .switchMap(([action, store]) => {
        return this.userCollectionService
        .GetUserCollections(action.payload.userName, store.pageIndex, store.pageSize,store.order)
        .map(data => {
            return new collectionActions.GetCollectionSuccessAction(data);
          })
          .catch((error) => {
            return Observable.of(
              new collectionActions.GetCollectionFailAction({showError: true})
            );
          });
    });
    @Effect() onUserUpdateCollectionImage$: Observable<Action> =
    this.actions$.ofType<collectionActions.UpdateCollectionImage>(collectionActions.CollectionActionTypes.UPDATE_COLLECTION_IMAGE)    
    .switchMap((action) => {
        
        return this.userCollectionService
        .UpdateCollectionImage(action.payload.collectionImage,action.payload.collectionId)
        .map(data => {
            console.log(data);
            return new collectionActions.UpdateCollectionImageSuccess(data.value);
          })
          .catch((error) => {
            return Observable.of(
              new collectionActions.UpdateCollectionImageFail({showError: true})
            );
          });
    });
    @Effect() onDeleteCollection$: Observable<Action> =
    this.actions$.ofType<collectionActions.DeleteCollection>(collectionActions.CollectionActionTypes.DELETE_COLLECTION)    
    .switchMap((action) => {        
        return this.userCollectionService
        .DeleteCollection(action.payload)
        .map(data => {
            console.log(data);
            return new collectionActions.DeleteCollectionSuccess(data);
          })
          .catch((error) => {
            return Observable.of(
              new collectionActions.DeleteCollectionFail({error: error})
            );
          });
    });

    @Effect() onDeleteColLoadBar$: Observable<Action> =
    this.actions$.ofType<collectionActions.DeleteCollection>(collectionActions.CollectionActionTypes.DELETE_COLLECTION)    
    .switchMap((action) => { 
      return Observable.of(new ShowProgressBar());
     });

    @Effect() onDeleteColLoadBarHide$: Observable<Action> =
    this.actions$.ofType<collectionActions.DeleteCollectionSuccess>(collectionActions.CollectionActionTypes.DELETE_COLLECTION_SUCCESS)    
    .switchMap((action) => { 
      return Observable.of(new HideProgressBar());
     });

    @Effect() onAddCollection$: Observable<Action> =
    this.actions$.ofType<collectionActions.AddCollection>(collectionActions.CollectionActionTypes.ADD_COLLECTION)    
    .switchMap((action) => {
        return this.userCollectionService
        .AddCollection(action.payload)
        .map(data => {
            let obs;
            if(data.isActionSucceed){
                obs = new collectionActions.AddCollectionSuccess(data);
            }else{
                obs = new collectionActions.AddCollectionFail(data);
            }
            return  obs;
          })
          .catch((error) => {
            return Observable.of(
              new collectionActions.AddCollectionFail({error: 'Oopss. an error occured. Check your internet connection'})
            );
          });
    });
    @Effect() onAddColLoadBar$: Observable<Action> =
    this.actions$.ofType<collectionActions.AddCollection>(collectionActions.CollectionActionTypes.ADD_COLLECTION)    
    .switchMap((action) => { 
      return Observable.of(new ShowProgressBar());
     });

    @Effect() onAddColLoadBarHide$: Observable<Action> =
    this.actions$.ofType<collectionActions.AddCollectionSuccess>(collectionActions.CollectionActionTypes.ADD_COLLECTION_SUCCESS)    
    .switchMap((action) => { 
      return Observable.of(new HideProgressBar());
     });
     @Effect() onAddFailColLoadBarHide$: Observable<Action> =
    this.actions$.ofType<collectionActions.AddCollectionFail>(collectionActions.CollectionActionTypes.ADD_COLLECTION_FAIL)    
    .switchMap((action) => { 
      return Observable.of(new HideProgressBar());
     });
     @Effect() onDelColLoadBar$: Observable<Action> =
     this.actions$.ofType<collectionActions.DeleteCollection>(collectionActions.CollectionActionTypes.DELETE_COLLECTION)    
     .switchMap((action) => { 
       return Observable.of(new ShowProgressBar());
      });
 
     @Effect() onDelColLoadBarHide$: Observable<Action> =
     this.actions$.ofType<collectionActions.DeleteCollectionSuccess>(collectionActions.CollectionActionTypes.DELETE_COLLECTION_SUCCESS)    
     .switchMap((action) => { 
       return Observable.of(new HideProgressBar());
      });
      @Effect() onDelFailColLoadBarHide$: Observable<Action> =
     this.actions$.ofType<collectionActions.DeleteCollectionFail>(collectionActions.CollectionActionTypes.DELETE_COLLECTION_FAIL)    
     .switchMap((action) => { 
       return Observable.of(new HideProgressBar());
      });
     @Effect() onUpdateColLoadBar$: Observable<Action> =
    this.actions$.ofType<collectionActions.UpdateCollectionImage>(collectionActions.CollectionActionTypes.UPDATE_COLLECTION_IMAGE)    
    .switchMap((action) => { 
      return Observable.of(new ShowProgressBar());
     });

    @Effect() onUpdateColLoadBarHide$: Observable<Action> =
    this.actions$.ofType<collectionActions.UpdateCollectionImageSuccess>(collectionActions.CollectionActionTypes.UPDATE_COLLECTION_IMAGE_SUCCESS)    
    .switchMap((action) => { 
      return Observable.of(new HideProgressBar());
     });
    @Effect() onUpdaeFailColLoadBarHide$: Observable<Action> =
    this.actions$.ofType<collectionActions.UpdateCollectionImageFail>(collectionActions.CollectionActionTypes.UPDATE_COLLECTION_IMAGE_FAIL)    
    .switchMap((action) => { 
      return Observable.of(new HideProgressBar());
     });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private userCollectionService: UserCollectionService
    ) {}
}
