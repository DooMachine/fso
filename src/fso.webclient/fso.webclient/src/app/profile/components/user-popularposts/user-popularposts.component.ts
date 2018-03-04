import { Component, OnInit, Input, Output, EventEmitter ,OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { PostBest } from '../../../shared/models/post/PostBest';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-user-best-post',
  templateUrl: './user-popularposts.component.html',
  styleUrls: ['./user-popularposts.component.scss']
})
export class UserPopularPostListComponent implements OnInit, OnDestroy {
  @Input() posts: PostBest[];
  @Input() isEmpty:boolean;
  @Input() alphaColor: string;
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
    // this.mouseOnPostEmitter.debounceTime(1000).flatMap((e) => {
    //   console.log('_mouseEnterStream.flatMap');
    //   return Observable
    //       .of(e)
    //       .delay(2000)
    //       .takeUntil(this.mouseLeavedPostEmitter);
    // }).subscribe(
    //   (e) => {
    //     console.log('yay, it worked!');
    //     console.log(e);
    //   }
    // );
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.onMouseDebouncer.unsubscribe();
    this.onMouseLeaveDebouncer.unsubscribe();
  }
  mouseOnPost(id: number) {
    //this.onMouseDebouncer.next({id});
  }
  mouseLeavedPost(id: number) {
    //this.onMouseLeaveDebouncer.next({id});
  }
}
