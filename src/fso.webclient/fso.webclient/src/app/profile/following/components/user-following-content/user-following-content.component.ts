import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserInfoSmallCard } from '../../../../shared/models/user/userSmallCard';
import { Store } from '@ngrx/store';
import { State, getFollowingsState, selectAll,selectHasNextPage,selectIsLoading,selectTotalCount } from '../../reducers/following';
import { MatDialogRef } from "@angular/material/dialog";
import { FollowUserAction, UnfollowUserAction, LoadMoreFollowingAction } from '../../actions/following';

@Component({
  selector: 'app-user-following-content',
  templateUrl: './user-following-content.component.html',
  styleUrls: ['./user-following-content.component.scss']
})
export class UserFollowingContentComponent implements OnInit {
  users$: Observable<UserInfoSmallCard[]>;
  hasNextPage$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  totalFollowingCount$ : Observable<number>;
  constructor(private store: Store<State>,
      private dialogRef: MatDialogRef<UserFollowingContentComponent>) {
      this.users$ = this.store.select(selectAll);
      this.hasNextPage$ = this.store.select(selectHasNextPage);
      this.isLoading$ = this.store.select(selectIsLoading);
      this.totalFollowingCount$ = this.store.select(selectTotalCount);
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
    this.store.dispatch(new LoadMoreFollowingAction());
  }

  navigated($event){
    console.log($event)
    this.dialogRef.close();
  }
}
