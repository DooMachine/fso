import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PostPart } from '../../../shared/models/postpart';

@Component({
  selector: 'app-post-postparts',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './post-postparts.component.html',
  styleUrls: ['./post-postparts.component.scss']
})
export class PostPostpartsComponent implements OnInit {
  @Input() nonActivepostParts: PostPart[];
  @Input() activePostPart: PostPart;
  @Input() postpartViewStyle: number;

  @Output() navigatedLeft = new EventEmitter();
  @Output() navigatedRight = new EventEmitter();
  @Output() changedToGrid = new EventEmitter();
  @Output() changedToSlide = new EventEmitter();
  @Output() gridPostPartClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  navigateLeft($event){
    this.navigatedLeft.emit($event);
  }
  navigateRight($event){
    this.navigatedRight.emit($event);
  }
  swipe(eType){
    console.log(eType);
    if(eType === 'swipeleft'){
      this.navigatedLeft.emit();
    }
    else if(eType === 'swiperight' ){
      this.navigatedRight.emit();
    }
  }
  changeToGrid($event){
    this.changedToGrid.emit($event);
  }
  changeToSlide($event){
    this.changedToSlide.emit($event);
  }

}
