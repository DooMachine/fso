import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { State, getFollowingsState, selectAll, selectIsModalOpen } from '../reducers/following';
import { GetFollowingAction, CloseModalAction } from '../actions/following';
import { UserInfoSmallCard } from '../../../shared/models/user/userSmallCard';


@Component({
    selector: 'app-user-following',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <app-followingmodal
    [isOpen]="isModalOpen$ | async"
    (modalClosed)="closeModal($event)"
    >
    </app-followingmodal>
    `,
    styles: [``]
})
export class UserFollowingComponent implements OnInit {
    
    isModalOpen$: Observable<boolean>;
    userName: string;
    constructor(
        private store: Store<State>,
        private route: ActivatedRoute

    ) {
        this.route.parent.parent.params.subscribe( (params) => {
            this.userName = params['userName'];
        });
        this.isModalOpen$ = this.store.select(selectIsModalOpen);
    }
    closeModal($event){
        this.store.dispatch(new CloseModalAction({userName: this.userName}));
    }
    ngOnInit() {
        // If username did not changed dont fetch data => SEEEFFECTS..
        this.store.dispatch(new GetFollowingAction({userName: this.userName }));            
     }
}
