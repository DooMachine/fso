import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserInfoSmallCard } from '../../../../shared/models/user/userSmallCard';
import { Store } from '@ngrx/store';
import { State, selectAll,selectHasNextPage,selectIsLoading,selectTotalCount } from '../../reducers/followers';
import { MatDialogRef } from "@angular/material/dialog";
import { FollowUserAction, UnfollowUserAction, LoadMoreFollowerAction,  } from '../../actions/followers';

@Component({
  selector: 'app-user-follower-content',
  templateUrl: './user-follower-content.component.html',
  styleUrls: ['./user-follower-content.component.scss']
})
export class UserFollowerContentComponent implements OnInit {
  users$: Observable<UserInfoSmallCard[]>;
  hasNextPage$: Observable<boolean>;
  isLoading$ : Observable<boolean>;
  totalFollowerCount$ : Observable<number>;
  constructor(private store: Store<State>, 
    private dialogRef: MatDialogRef<UserFollowerContentComponent>) {
    this.users$ = this.store.select(selectAll);
    this.hasNextPage$ = this.store.select(selectHasNextPage);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.totalFollowerCount$ = this.store.select(selectTotalCount);
   }

  ngOnInit() {
  }
  followUser($event){
    this.store.dispatch(new FollowUserAction($event))
  }
  unfollowUser($event){
    this.store.dispatch(new UnfollowUserAction($event))
  }
  loadMore($event){
    this.store.dispatch(new LoadMoreFollowerAction());
  }
  navigated($event){
    this.dialogRef.close();
  }
}
