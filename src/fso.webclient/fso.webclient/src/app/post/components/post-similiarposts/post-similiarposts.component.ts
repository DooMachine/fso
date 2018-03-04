import { Component, OnInit, Input,Output, ChangeDetectionStrategy, EventEmitter, OnDestroy } from '@angular/core';
import { SimiliarPost } from '../../models/similiarpost';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-post-similiarposts',
  templateUrl: './post-similiarposts.component.html',
  styleUrls: ['./post-similiarposts.component.scss']
})
export class PostSimiliarpostsComponent implements OnInit , OnDestroy{
  @Input() similiarPosts: SimiliarPost[];
  @Input() isLoading:boolean;
  
  @Output() mouseOnPostEmitter = new EventEmitter();
  @Output() mouseLeavedPostEmitter = new  EventEmitter();
  onMouseDebouncer: Subject<any> = new Subject();
  onMouseLeaveDebouncer: Subject<any> = new Subject();
  constructor() {
    this.onMouseDebouncer
    .debounceTime(600)
    .subscribe((val) => { this.mouseOnPostEmitter.emit({id: val.id}); });

    this.onMouseLeaveDebouncer
    .debounceTime(600)
    .subscribe((val) => { this.mouseLeavedPostEmitter.emit({id: val.id}); });
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.onMouseDebouncer.unsubscribe();
    this.onMouseLeaveDebouncer.unsubscribe();
  }
  mouseOnPost(id: number) {
    this.onMouseDebouncer.next({id});
  }
  mouseLeavedPost(id: number) {
    this.onMouseLeaveDebouncer.next({id});
  }
}
