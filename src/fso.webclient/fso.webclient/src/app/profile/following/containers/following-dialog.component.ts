import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserFollowingContentComponent } from '../components/user-following-content/user-following-content.component';
import { ChangeDetectorRef, AfterViewChecked } from '@angular/core';
@Component({
    selector: 'app-followingmodal',
    template: ``,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowingModalComponent implements OnInit, OnChanges{
    @Input() isOpen: boolean;
    @Output() modalClosed = new EventEmitter();
    private dialogRef: MatDialogRef<UserFollowingContentComponent>;
    constructor(private dialog: MatDialog) { 
      
    }

    ngOnInit() { 
      
    }
    ngOnChanges(changes: SimpleChanges){
        if (changes["isOpen"].currentValue) {
            if (this.isOpen) {
              setTimeout(() => {
                this.dialogRef = this.dialog.open(UserFollowingContentComponent, {                  
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