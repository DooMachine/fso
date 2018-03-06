import { Component, OnInit,Input, trigger, transition, animate,SimpleChanges, style,OnDestroy,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PostCardPostPart } from '../../models/postcard/postCardPostPart';
import { Observable } from 'rxjs/Observable';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-postcard-postpart',
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
  template: `
  <a [routerLink] ="['/post',postId]">
    <mat-grid-list cols="24" rowHeight="1:3">
    <mat-grid-tile
        *ngFor="let tile of gridTiles; let i=index"
        
        [colspan]="tile.cols"
        [rowspan]="tile.rows"
        [style.background]="alphaColor">
        <!--<img
          *ngIf="!tile.isLoading"
          [@outAnimation]
          [src]=" tile.postPart.image.lazyUrl"
          class="postPartImageSizeHandle absLazy fillContainer" />-->
          <img          
          (load)="imageLoaded(i)"
          [ngClass]="i==0 || postPartCount==2 ?  'img-responsive' : ''"
          [src]=" i==0 || postPartCount==2 ? tile.postPart.image.url:tile.postPart.image.smallUrl"
          class="postPartImageSizeHandle" />
        
      </mat-grid-tile>
    </mat-grid-list>
  </a>
  `,
  styles: [`
  :host{
    max-width:100%;
  }
  .fillContainer{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:12;
    filter:blur(20px);
  }
  mat-grid-tile{
    background:#000 !important;
  }
  .postPartImageSizeHandle{ 
    
   }`],
})
export class PostcardPostpartComponent implements OnInit, OnDestroy {
  @Input() postParts: PostCardPostPart[];
  @Input() alphaColor:string = 'white';
  @Input() postId: number;
  @Input() username:string;
  gridTiles = [];
  gridColumns = 24;
  postPartCount:number;
  rowHeight = '65px';
  constructor(public breakpointObserver: BreakpointObserver) { }
  
  ngOnInit() {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    if(isSmallScreen){
      this.rowHeight = '55px';
    }
    this.postPartCount = this.postParts.length;
    switch (this.postPartCount) {
      case 0:
        break;
      case 1:
        this.gridTiles.push({postPart: this.postParts[0], cols:24 ,rows:6,isLoading:true })
        break;
      case 2:
        this.gridTiles.push({postPart: this.postParts[0], cols:12 ,rows:6,isLoading:true });
        this.gridTiles.push({postPart: this.postParts[1], cols:12 ,rows:6,isLoading:true });
        break;
      case 3:
      if(isSmallScreen){
          this.gridTiles.push({postPart: this.postParts[0], cols:24 ,rows:4,loading:true });
          this.gridTiles.push({postPart: this.postParts[1], cols:12 ,rows:2,loading:true });
          this.gridTiles.push({postPart: this.postParts[2], cols:12 ,rows:2,loading:true });
          break;
        }
        this.gridTiles.push({postPart: this.postParts[0], cols:16 ,rows:6,isLoading:true });
        this.gridTiles.push({postPart: this.postParts[1], cols:8 ,rows:3,isLoading:true });
        this.gridTiles.push({postPart: this.postParts[2], cols:8 ,rows:3,isLoading:true });
        break;
      case 4:
      if(isSmallScreen){
          this.gridTiles.push({postPart: this.postParts[0], cols:24 ,rows:4,loading:true });
          this.gridTiles.push({postPart: this.postParts[1], cols:8 ,rows:2 ,loading:true});
          this.gridTiles.push({postPart: this.postParts[2], cols:8 ,rows:2,loading:true });
          this.gridTiles.push({postPart: this.postParts[3], cols:8 ,rows:2,loading:true });
          break;
        }
        this.gridTiles.push({postPart: this.postParts[0], cols:16 ,rows:6,isLoading:true });
        this.gridTiles.push({postPart: this.postParts[1], cols:8 ,rows:2,isLoading:true });
        this.gridTiles.push({postPart: this.postParts[2], cols:8 ,rows:2,isLoading:true });
        this.gridTiles.push({postPart: this.postParts[3], cols:8 ,rows:2,isLoading:true });
        break;
      default:
        if(isSmallScreen){
          this.gridTiles.push({postPart: this.postParts[0], cols:24 ,rows:4,loading:true });
          this.gridTiles.push({postPart: this.postParts[1], cols:8 ,rows:2 ,loading:true});
          this.gridTiles.push({postPart: this.postParts[2], cols:8 ,rows:2,loading:true });
          this.gridTiles.push({postPart: this.postParts[3], cols:8 ,rows:2,loading:true });
          break;
        }
        this.gridTiles.push({postPart: this.postParts[0], cols:16 ,rows:6,isLoading:true });
        this.gridTiles.push({postPart: this.postParts[1], cols:8 ,rows:2,isLoading:true });
        this.gridTiles.push({postPart: this.postParts[2], cols:8 ,rows:2,isLoading:true });
        this.gridTiles.push({postPart: this.postParts[3], cols:8 ,rows:2,isLoading:true });
        break;
    }    
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.breakpointObserver.ngOnDestroy();
  }
  imageLoaded(i:number){
    this.gridTiles[i].isLoading= false;
  }
}
