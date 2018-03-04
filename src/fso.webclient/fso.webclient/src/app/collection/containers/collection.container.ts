import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { selectUserId, selectUserProfileImage } from '../../auth/reducers/auth.reducer';
import { State } from '../../reducers';
import { GetCollection } from '../actions/collection';
import { CollectionState,selectCollectionState,getCollection } from '../reducers/collection';
import { PostCard } from '../../shared/models/postCard/postCard';
import { selectAll } from '../reducers/post';
import { LikeCollectionPostAction, UnLikeCollectionPostAction } from '../actions/post';

@Component({
    selector: 'app-collection',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <app-collection-detail
        [collection]="collection$ | async">
    </app-collection-detail>
    <app-collection-post-list
        (onlikePost)="onlikePost($event)"
        (onunlikePost)="onunlikePost($event)"
        [posts]="posts$ | async"
        [authUserId] = "authUserId$ | async"
    >    
    </app-collection-post-list>
         `,
    styles: [``]
})

export class CollectionComponent implements OnInit {
    urlParam:number;
    collection$: Observable<CollectionState>;
    authUserId$:Observable<string>;
    posts$:Observable<PostCard[]>;
    constructor(private store: Store<State>, private route: ActivatedRoute) {
        this.route.params.subscribe( (params) => {
            this.urlParam = params['id'];  
            this.store.dispatch(new GetCollection({id:this.urlParam}));
        });
        this.collection$ = this.store.select(getCollection);
        this.posts$ = this.store.select(selectAll);
        this.authUserId$ = this.store.select(selectUserId);
    }
    ngOnInit() {        
    }
    onlikePost($event){
        this.store.dispatch(new LikeCollectionPostAction({id:$event}));
     }
     onunlikePost($event){
        this.store.dispatch(new UnLikeCollectionPostAction({id:$event}));
     }

}
