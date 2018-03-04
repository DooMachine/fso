import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserFollowerContentComponent } from '../components/user-follower-content/user-follower-content.component';

@Component({
    selector: 'app-followermodal',
    template: ``,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowerModalComponent implements OnInit, OnChanges{
    @Input() isOpen: boolean;
    @Output() modalClosed = new EventEmitter();
    private dialogRef: MatDialogRef<UserFollowerContentComponent>;
    constructor(private dialog: MatDialog) {       
    }

    ngOnInit() { 
      
    }
    ngOnChanges(changes: SimpleChanges){
        if (changes["isOpen"].currentValue) {
            if (this.isOpen) {
              setTimeout(() => {
                this.dialogRef = this.dialog.open(UserFollowerContentComponent, {
                  width: '900px',
                  maxWidth: '90%',
                  maxHeight: '84%',
                  minHeight: '200px',
                  autoFocus:false,                 
                });
                this.dialogRef.afterClosed().subscribe(result => {
                  this.modalClosed.emit();
                });
               });
              
            } else {
              this.dialogRef.close();
            }
          }
    }
}