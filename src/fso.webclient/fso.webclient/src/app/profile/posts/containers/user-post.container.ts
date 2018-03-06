import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State} from '../reducers/post';
import { GetPostAction, LikePostAction, UnLikePostAction } from '../actions/post';
import { PostCard } from '../../../shared/models/postcard/postCard';
import { getAllPosts,selectProfilePostLoading,selectProfilePostHasNextPage } from '../reducers';
import { selectUserId } from '../../../auth/reducers/auth.reducer';


@Component({
    selector: 'app-user-post',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div *ngIf="hasNextPage$ | async"
        infiniteScroll 
        [treshold]="0.52"
        [querySelector]="'#app-user-post-id'"
        (onEnterElement)="onScroll()"
        (onLeaveElement)="onLeave()"
        class="feed_w_wrap">
    </div>
    <app-userpost-list-component
        (onlikePost)="onlikePost($event)"
        (onunlikePost)="onunlikePost($event)"
        [posts]="posts$ | async"
        [authUserId] = "authUserId$ | async"
    >    
    </app-userpost-list-component>
    <div fxLayout="row" fxLayoutAlign="center center" id="app-user-post-id">            
        <mat-progress-spinner
        *ngIf="(loading$ | async)"
        class="center"
        color="primary"
        mode="indeterminate"
        diameter="32"
        >
        </mat-progress-spinner>            
    </div>
    `,
    styles: [`#app-user-post-id{height:150px;}`]
})
export class UserPostComponent implements OnInit {
    posts$: Observable<PostCard[]>;
    loading$:Observable<boolean>;
    authUserId$:Observable<string>;
    userName: string;
    hasNextPage$:Observable<boolean>;
    constructor(
        private store: Store<State>,
        private route: ActivatedRoute

    ) {
        this.route.parent.parent.params.subscribe( (params) => {
            this.userName = params['userName'];
        });
        this.authUserId$ = this.store.select(selectUserId);
        this.posts$ = this.store.select(getAllPosts);
        this.loading$ = this.store.select(selectProfilePostLoading);
        this.hasNextPage$ = this.store.select(selectProfilePostHasNextPage)
     }

    ngOnInit() {
        // If username did not changed dont fetch data => SEEEFFECTS..
            
            this.store.dispatch(new GetPostAction({userName: this.userName }));
     }
     onScroll(){
        this.store.dispatch(new GetPostAction({userName: this.userName }));
     }
     onlikePost($event){
        this.store.dispatch(new LikePostAction({id:$event}));
     }
     onunlikePost($event){
        this.store.dispatch(new UnLikePostAction({id:$event}));
     }
}
