import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { PostCard } from '../../../shared/models/postCard/postCard';
import { selectUserId,selectIsMod } from '../../../auth/reducers/auth.reducer';
import { State } from '../reducers';
import * as fromInterestFollowers from '../reducers/followers';
import * as interestFollowersActions from '../actions/followers';
import { UserInfoSmallCard } from '../../../shared/models/user/userSmallCard';

@Component({    
    selector: 'app-interest-community',
    template: `
            <app-community-user-list
                [users]="users$ | async"
                [isLoading]="isLoading$ | async"
                [hasNextPage]="hasNextPage$ | async"
                (followUser)="followUser($event)"
                (unfollowUser)="unfollowUser($event)"
                (loadMore)="triggerScroll($event)"
            >
            </app-community-user-list>
            `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class InterestCommunityComponent implements OnInit {

    users$: Observable<UserInfoSmallCard[]>;
    isLoading$:Observable<boolean>;
    hasNextPage$:Observable<boolean>;
    authUserId$: Observable<string>;
    isMod$:Observable<boolean>;
    urlKey: string;
    constructor(private store: Store<State>, private route: ActivatedRoute) {
        this.route.parent.parent.params.subscribe( (params) => {
            this.urlKey = params['urlKey'];
        });
        this.store.dispatch(new interestFollowersActions.GetInterestFollowers(this.urlKey));
        this.users$ = this.store.select(fromInterestFollowers.selectAll);
        this.isLoading$ = this.store.select(fromInterestFollowers.selectIsLoading);
        this.hasNextPage$ = this.store.select(fromInterestFollowers.selectHasNextPage);
        this.authUserId$ = this.store.select(selectUserId);
        this.isMod$ = this.store.select(selectIsMod);
    }
    ngOnInit() {

    }
    triggerScroll($event){
        console.log("Implement infinite-scroll");
        this.store.dispatch(new interestFollowersActions.GetInterestFollowers(this.urlKey));
    }
    

    followUser($event){
        this.store.dispatch(new interestFollowersActions.FollowUser($event));
    }
    unfollowUser($event){
        this.store.dispatch(new interestFollowersActions.UnfollowUser($event));
    }
}
