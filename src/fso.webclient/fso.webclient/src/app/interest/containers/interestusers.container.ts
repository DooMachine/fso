import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import * as interestActions from '../actions/interest';
import { Interest } from '../models/interest';
import { PaginatedPostList } from '../models/paginatedPost';
import * as fromInterest from '../reducers/interest';
import * as fromInterestPost from '../reducers/posts';
import { PostCard } from '../../shared/models/postCard/postCard';
import { selectUserId,selectIsMod } from '../../auth/reducers/auth.reducer';
import { selectInterest } from '../reducers/interest';
import { State } from '../reducers/interest';

@Component({    
    selector: 'app-interest-users',
    template: `
    <div class="home-wrapper">
            <app-paginated-post
                [authUserId]="authUserId$ | async"
                [isMod]="isMod$ | async"
                [posts]="posts$ | async"
                (onScrollTriggered)="triggerScroll($event)"
            >

            </app-paginated-post>
            </div>
            `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class InterestUsersComponent implements OnInit {

    posts$: Observable<PostCard[]>;
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
    }
    ngOnInit() {

    }
    triggerScroll($event){
        console.log("Implement infinite-scroll");
    }
}
