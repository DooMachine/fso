import { Component, OnInit, Input, EventEmitter, Output,ChangeDetectionStrategy } from '@angular/core';
import { State } from '../../reducers/interest';
import { Interest } from '../../models/interest';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-interest-detail',
  templateUrl: './interest-detail.component.html',
  styleUrls: ['./interest-detail.component.scss']
})
export class InterestDetailComponent implements OnInit {
  @Input() interest: Interest;
  @Input() isMod:boolean;
  @Output() joinGroup = new EventEmitter();
  @Output() onCoverImageChanged = new EventEmitter();
  @Output() onProfileImageChanged = new EventEmitter();
  @Output() followGroup = new EventEmitter();
  @Output() leaveGroup = new EventEmitter();
  constructor() { }

  public coverImageChanged($event){
    var file = $event.target.files[0];
    if((this.IsFileImage(file.name))){
      this.onCoverImageChanged.emit({coverImage:file,groupId: this.interest.id});
    }    
  }

  public profileImageChanged($event){
    var file = $event.target.files[0];
    if((this.IsFileImage(file.name))){
      this.onProfileImageChanged.emit({profileImage:file,groupId: this.interest.id});
    }    
  }

  private IsFileImage(fileName: string): boolean {
    const okayImageExtensions = ["jpg","jpeg","png","gif"];
    const sFileExtension = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
    const isOkay = okayImageExtensions.filter((extension) => extension === sFileExtension).length
    if (!isOkay){
        return false;
    }
    return true;
  }
  ngOnInit() {
  }
    
}
