import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { InterestCard } from '../../shared/models/interest/interestcard';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import * as popActions from '../actions/popularposts';
import * as fromPop from '../reducers/popularposts';
import { getUserAlphaColor } from '../reducers/user';
import { PostBest } from '../../shared/models/post/PostBest';

@Component({
    selector: 'app-user-popularposts',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <app-user-best-post
        (mouseOnPostEmitter)="onPostAction($event)"
        (mouseLeavedPostEmitter)="leavedPostAction($event)"
        [alphaColor] = "userAlphaColor$ | async"
        [posts] = "posts$ | async"
        [isEmpty] = "isEmpty$|async"
        >
    </app-user-best-post>
    `,
    styles: [``]
})
export class UserPopularPostsComponent implements OnInit  {
    posts$: Observable<PostBest[]>;
    userAlphaColor$: Observable<string>;
    isEmpty$ : Observable<boolean>;
    userName: string;
    constructor(
        private store: Store<fromPop.State>,
        private route: ActivatedRoute

    ) {
        this.route.parent.params.subscribe( (params) => {
            this.userName = params['userName'];
        });
        this.posts$ = this.store.select(fromPop.selectAll);
        this.isEmpty$ = this.store.select(fromPop.isEmpty);
        this.userAlphaColor$ = this.store.select(getUserAlphaColor);
     }

    ngOnInit() {
        // If username did not changed dont fetch data => SEEEFFECTS..
     }
    showMore() {
        this.store.dispatch(new popActions.GetPopularPostsAction({ userName: this.userName }));
    }
    onPostAction($event) {
        this.store.dispatch(new popActions.IncrementThumbnailIndex({id: $event.id}));
    }
    leavedPostAction($event){
        this.store.dispatch(new popActions.ResetThumbnailIndex({id: $event.id}));
    }
}
