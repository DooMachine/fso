import { Component, OnInit, ChangeDetectionStrategy, NgZone, Renderer, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Store } from '@ngrx/store';
import { State, ProgressBarState } from '../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { ShowProgressBar, HideProgressBar } from '../../actions/index';

@Component({
    selector: 'app-progress-bar',
    
    template: `<div 
                class="loading-overlay"
                >    
                <mat-progress-bar
                [style.opacity] = "progressBarMode"
                color="warn" mode="indeterminate"></mat-progress-bar>
                </div>`,
    styles: [`.loading-overlay{
                position: fixed;
                width:100%;
                top:0;
                left:0;
                z-index:12;
            }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {
    @Input() progressBarMode: number;
    
    constructor(private router: Router,
        private store: Store<State>) {
            router.events.subscribe((event: RouterEvent) => {
                this._navigationInterceptor(event)
            })
            
         }

    ngOnInit() { 
        
    }

    private _navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
          // We wanna run this function outside of Angular's zone to
          // bypass change detection
          this.store.dispatch(new ShowProgressBar());
        }
        if (event instanceof NavigationEnd) {
           this.store.dispatch(new HideProgressBar());
        }
        // Set loading state to false in both of the below events to
        // hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
             this.store.dispatch(new HideProgressBar());
        }
        if (event instanceof NavigationError) {
             this.store.dispatch(new HideProgressBar());
        }
      }
    
      
}