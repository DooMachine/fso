import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as postActions from '../actions/post';
import * as interestActions from '../actions/interest';
import { PostCard } from "../../shared/models/postCard/postCard";
import { InterestCard } from "../../shared/models/interest/interestcard";
import { selectAllTrendingInterests } from "../reducers/interest";
import { selectAllTrendingPosts } from "../reducers/post";
import { State as TrendingState } from '../reducers';
@Component({
    selector: 'app-trending',
    templateUrl: './trending.container.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./trending.container.scss']
})
export class TrendingContainer implements OnInit {

    interests$: Observable<InterestCard[]>;
    posts$: Observable<PostCard[]>;

    constructor(private store: Store<TrendingState>) {
        this.interests$ = this.store.select(selectAllTrendingInterests);
        this.posts$ = this.store.select(selectAllTrendingPosts);
    }
    
    ngOnInit() {
        this.store.dispatch(new postActions.GetTrendingPosts());
        this.store.dispatch(new interestActions.GetInterestAction());
     }
}
