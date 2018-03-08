import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PostPart } from '../../../shared/models/postpart';

@Component({
  selector: 'app-editpost-postparts',
  templateUrl: './editpost-postparts.component.html',
  styleUrls: ['./editpost-postparts.component.scss']
})
export class EditPostPostpartsComponent implements OnInit {
  @Input() postparts: PostPart[];
  @Input() postpartcount: number;
  @Input() postPartPending:boolean;
  maxPostPartCount = 4;
  @Output() removePostpart = new EventEmitter();
  @Output() postPartAdded: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public fileChangeEvent($event){
    var file = $event.target.files[0];
    console.log(file);
    if((this.IsFileImage(file.name))){
      this.postPartAdded.emit(file);
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
}
