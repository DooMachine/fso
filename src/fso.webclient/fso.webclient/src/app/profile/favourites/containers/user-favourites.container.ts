import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { State,selectAll,selectLoading,selectHasNextPage,selectIsEmpty } from '../reducers/favourites';
import { GetFavouritesAction ,LikePostAction, UnLikePostAction} from '../actions/favourites';
import { PostCard } from '../../../shared/models/postCard/postCard';
import { selectUserId } from '../../../auth/reducers/auth.reducer';


@Component({
    selector: 'app-user-favourites',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div *ngIf="hasNextPage$ | async"
        infiniteScroll 
        [treshold]="0.52"
        [querySelector]="'#app-user-fav-id'"
        (onEnterElement)="onScroll()"
        (onLeaveElement)="onLeave()"
        class="feed_w_wrap">
    </div>
    <app-user-favourites-list
        (onlikePost)="onlikePost($event)"
        (onunlikePost)="onunlikePost($event)"
        [authUserId]="authUserId$ | async"
        [favourites]="favourites$ | async"
    >
        
    </app-user-favourites-list>
    <div fxLayout="row" fxLayoutAlign="center center" id="app-user-fav-id">            
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
    styles: [`#app-user-fav-id{height:150px;}`]
})
export class UserFavouritesComponent implements OnInit {
    favourites$: Observable<PostCard[]>;
    authUserId$:Observable<string>;
    loading$:Observable<boolean>;
    hasNextPage$:Observable<boolean>;
    isEmpty$:Observable<boolean>;
    userName: string;
    constructor(
        private store: Store<State>,
        private route: ActivatedRoute

    ) {
        this.route.parent.parent.params.subscribe( (params) => {
            this.userName = params['userName'];
        });
        this.favourites$ = this.store.select(selectAll);
        this.authUserId$ = this.store.select(selectUserId);
        this.loading$ = this.store.select(selectLoading);
        this.hasNextPage$ = this.store.select(selectHasNextPage);
        this.isEmpty$ = this.store.select(selectIsEmpty);
     }

    ngOnInit() {
        // If username did not changed dont fetch data => SEEEFFECTS..
            this.store.dispatch(new GetFavouritesAction({userName: this.userName }));
     }
     onScroll(){
        this.store.dispatch(new GetFavouritesAction({userName: this.userName }));
     }
     onlikePost($event){
        this.store.dispatch(new LikePostAction({id:$event}));
     }
     onunlikePost($event){
        this.store.dispatch(new UnLikePostAction({id:$event}));
     }
}
