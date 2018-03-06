import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State, selectIsModalOpen } from '../reducers/followers';
import { GetFollowerAction, CloseModalAction } from '../actions/followers';


@Component({
    selector: 'app-user-followers',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <app-followermodal
    [isOpen]="isModalOpen$ | async"
    (modalClosed)="closeModal($event)"
    >
    </app-followermodal>
    `,
    styles: [``]
})
export class UserFollowersComponent implements OnInit {
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
            this.store.dispatch(new GetFollowerAction({userName: this.userName }));
     }
}
