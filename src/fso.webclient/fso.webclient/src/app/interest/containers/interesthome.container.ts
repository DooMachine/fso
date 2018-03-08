import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as postActions from '../actions/posts';
import { Interest } from '../models/interest';
import { PaginatedPostList } from '../models/paginatedPost';
import * as fromInterest from '../reducers/interest';
import * as fromInterestPost from '../reducers/posts';
import { PostCard } from '../../shared/models/postcard/postCard';
import { selectUserId,selectIsMod } from '../../auth/reducers/auth.reducer';
import { selectInterest } from '../reducers/interest';
import { State } from '../reducers/interest';

@Component({    
    selector: 'app-interest-home',
    template: `
        <div *ngIf="hasNextPage$ | async"
            infiniteScroll 
            [treshold]="0.51"
            [querySelector]="'#i-home'"
            (onEnterElement)="onScroll()"
            (onLeaveElement)="onLeave()"
            class="feed_w_wrap">
        </div>
            <app-paginated-post
                [authUserId]="authUserId$ | async"
                [isMod]="isMod$ | async"
                [posts]="posts$ | async"
                (likePost)="likePost($event)"
                (unlikePost)="unlikePost($event)"
                (followUser)="followUser($event)"
                (unfollowUser)="unfollowUser($event)"
            >
            </app-paginated-post>
        <div fxLayout="row" fxLayoutAlign="center center" id="i-home">                 
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
    styles: [`#i-home{min-height:120px;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class InterestHomeComponent implements OnInit {

    posts$: Observable<PostCard[]>;
    loading$:Observable<boolean>;
    hasNextPage$:Observable<boolean>;
    authUserId$: Observable<string>;
    isMod$:Observable<boolean>;
    urlKey: string;
    constructor(private store: Store<State>, private route: ActivatedRoute) {
        this.route.params.subscribe( (params) => {
            this.urlKey = params['urlKey'];
        });
        this.posts$ = this.store.select(fromInterestPost.selectAll);
        this.authUserId$ = this.store.select(selectUserId);
        this.isMod$ = this.store.select(selectIsMod);
        this.loading$=this.store.select(fromInterestPost.selectLoading);
        this.hasNextPage$ = this.store.select(fromInterestPost.selectHasNextPage);
    }
    ngOnInit() {

    }
    onScroll($event){
        this.store.dispatch(new postActions.GetInterestPostAction({urlKey:this.urlKey}));
    }
    likePost($event){
        this.store.dispatch(new postActions.LikeInterestPostAction({id:$event}));
    }
    unlikePost($event){
        this.store.dispatch(new postActions.UnLikeInterestPostAction({id:$event}));
    }

    followUser($event){
        this.store.dispatch(new postActions.FollowUser($event));
    }
    unfollowUser($event){
        this.store.dispatch(new postActions.UnfollowUser($event));
    }
}
