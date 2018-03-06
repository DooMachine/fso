import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State } from '../reducers/interest';
import { UserActions, GetUserAction, FollowUserAction, UnfollowUserAction, UpdateProfileSeo } from '../actions/user';
import { UserActivityActions, GetUserActivitiesAction } from '../actions/userActivity';
import { User } from '../models/userinfo';
import { selectUserName, selectUserId } from '../../auth/reducers/auth.reducer';


@Component({
    changeDetection:ChangeDetectionStrategy.OnPush,
    selector: 'app-user',
    template: `
    <app-user-info
     [userInfo] = "userInfo$ | async"
     [currentUserName] ="currentUserName$ | async"
     (followEmit)="followUser($event)"
     (unFollowEmit)="unfollowUser($event)"
     >
        <app-user-tab tabs></app-user-tab>
        <app-user-interests 
        
        interests></app-user-interests>
        <!--<app-user-popularposts bestPosts></app-user-popularposts>-->
    </app-user-info>
    `,
    styles: [``]
})
export class UserComponent implements OnInit {
    userInfo$: Observable<User>;
    prevUserName: Observable<string>;
    userName: string;
    currentUserName$: Observable<string>;
    constructor(
        private store: Store<State>,
        private route: ActivatedRoute

    ) {

        this.userInfo$ = this.store.select(str => str['profile'].userInfo.userInfo);
        this.prevUserName = this.store.select(str => str['profile'].userInfo.userInfo.username);
        this.currentUserName$ = this.store.select(selectUserName);
        
        this.route.params.subscribe( (params) => {
            this.userName = params['userName'];    
            // If username did not changed dont fetch data => SEE EFFECTS..                    
            this.store.dispatch(new GetUserAction({userName: this.userName }));            
            this.store.dispatch(new UpdateProfileSeo())
        });
        
     }

    ngOnInit() {
        
            
     }

    followUser($event) {
        this.store.dispatch( new FollowUserAction($event));
    }
    unfollowUser($event) {
        this.store.dispatch( new UnfollowUserAction($event));
    }
}
