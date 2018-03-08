import { Component, OnInit, Input, Output, EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { PostState } from '../../reducers/post';
import { MatDialog } from '@angular/material';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  @Input() post: PostState;


  @Output() followUser = new EventEmitter();
  @Output() unfollowUser = new EventEmitter();

  @Output() ondelete = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  @Input() authUserId:string;

  deletePost($event){
      let dialogRef = this.dialog.open(AskIfSureDialogComponent, {
        width: '290px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.ondelete.emit($event);
        }
      });
  }
}

@Component({
  selector: 'AskIfSure',
  template: `<h2 mat-dialog-title>Delete post</h2>
  <mat-dialog-content>Are you sure?</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>No</button>
    <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
    <button mat-button [mat-dialog-close]="true">Yes</button>
  </mat-dialog-actions>`,
})
export class AskIfSureDialogComponent {}