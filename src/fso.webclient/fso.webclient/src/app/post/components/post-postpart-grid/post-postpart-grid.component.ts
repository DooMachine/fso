import { Component, OnInit, Input, Output ,EventEmitter, OnChanges, SimpleChanges, style, animate, transition, trigger, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { PostPart } from '../../../shared/models/postpart';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-post-postpart-grid',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './post-postpart-grid.component.html',
  styleUrls: ['./post-postpart-grid.component.scss'],
  animations: [
    trigger(
      'outAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('10ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('1400ms', style({transform: 'translateX(0)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class PostPostpartGridComponent implements OnInit, OnChanges,OnDestroy {
  @Input() nonActivepostParts:PostPart[];
  @Input() activePostPart: PostPart;

  @Output() onPostPartClick = new EventEmitter();

  postPartCount:number;
  gridTiles = [];
  gridColumns = 24;
  rowHeight = '80px';
  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnChanges(changes: SimpleChanges) {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    if(isSmallScreen){
      this.rowHeight = '65px';
    }
    this.postPartCount = this.nonActivepostParts.length +1;
    this.gridTiles=[];
    switch (this.postPartCount) {
      case 0:
        break;
      case 1:
        this.gridTiles.push({postPart: this.activePostPart, cols:24 ,rows:6,loading:true })
        break;
      case 2:
        this.gridTiles.push({postPart: this.activePostPart, cols:12 ,rows:6,loading:true });
        this.gridTiles.push({postPart: this.nonActivepostParts[0], cols:12 ,rows:6 });
        break;
      case 3:
        if(isSmallScreen){
          this.gridTiles.push({postPart: this.activePostPart, cols:24 ,rows:4,loading:true });
          this.gridTiles.push({postPart: this.nonActivepostParts[0], cols:12 ,rows:2,loading:true });
          this.gridTiles.push({postPart: this.nonActivepostParts[1], cols:12 ,rows:2,loading:true });
          break;
        }
        this.gridTiles.push({postPart: this.activePostPart, cols:16 ,rows:6,loading:true });
        this.gridTiles.push({postPart: this.nonActivepostParts[0], cols:8 ,rows:3,loading:true });
        this.gridTiles.push({postPart: this.nonActivepostParts[1], cols:8 ,rows:3,loading:true });
        break;
      case 4:
        if(isSmallScreen){
          this.gridTiles.push({postPart: this.activePostPart, cols:24 ,rows:4,loading:true });
          this.gridTiles.push({postPart: this.nonActivepostParts[0], cols:8 ,rows:2 ,loading:true});
          this.gridTiles.push({postPart: this.nonActivepostParts[1], cols:8 ,rows:2,loading:true });
          this.gridTiles.push({postPart: this.nonActivepostParts[2], cols:8 ,rows:2,loading:true });
          break;
        }
        this.gridTiles.push({postPart: this.activePostPart, cols:16 ,rows:6,loading:true });
        this.gridTiles.push({postPart: this.nonActivepostParts[0], cols:8 ,rows:2 ,loading:true});
        this.gridTiles.push({postPart: this.nonActivepostParts[1], cols:8 ,rows:2,loading:true });
        this.gridTiles.push({postPart: this.nonActivepostParts[2], cols:8 ,rows:2,loading:true });
        break;
      default:
        this.gridTiles.push({postPart: this.activePostPart, cols:16 ,rows:6,loading:true });
        this.gridTiles.push({postPart: this.nonActivepostParts[0], cols:8 ,rows:2,loading:true });
        this.gridTiles.push({postPart: this.nonActivepostParts[1], cols:8 ,rows:2,loading:true });
        this.gridTiles.push({postPart: this.nonActivepostParts[2], cols:8 ,rows:2,loading:true });
        break;
      
    }
    
  }
  ngOnInit() {
    
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.breakpointObserver.ngOnDestroy();
  }
  imageLoaded(i){
    // debug delay show
    this.gridTiles[i].loading = false;    
  }
}
