import { Directive, Input, ElementRef, HostListener,OnChanges,AfterContentInit, NgZone, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { PlatformService } from "../services/platform.service";

@Directive({
    selector: '[infiniteScroll]'
  })
  export class InfiniteScrollDirective implements  AfterContentInit {
    observer:any;
    @Input() throttle:number = 700;
    @Input() treshold:number = 0.79;
    @Input() querySelector:string;
    @Input() selector:string = "";
    @Output() onEnterElement = new EventEmitter();
    @Output() onLeaveElement = new EventEmitter();
    constructor(private ngZone: NgZone, private platformService:PlatformService) {}
    ngOnInit() {            
        
       
    }
    ngAfterContentInit() {
      if(this.platformService.isBrowser){      
        var options = {
          root: null,
          rootMargin: '0px',
          threshold: this.treshold
        }
        
        this.observer = new IntersectionObserver(this.scroll, options);
        
        var target = document.querySelector(this.querySelector);
        this.observer.observe(target);
      }
    }
    ngOnDestroy() {
      if(this.platformService.isBrowser){
        this.observer.disconnect();
      }
    }

    scroll = ($event): void => {
      if(this.platformService.isBrowser){
        if($event[0].intersectionRatio > this.treshold) {
            this.onEnterElement.emit();
        }
      }
    };   
}
