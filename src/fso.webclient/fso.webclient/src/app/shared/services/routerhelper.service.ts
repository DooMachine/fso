import { Injectable, Renderer } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Injectable()
export class RouterHelperService {
    previousUrl: string = 'none';
    constructor(
        private router: Router
      ) {
        this.router.events
          .subscribe((event) => {
            if (event instanceof NavigationStart) {
              this.previousUrl = event.url;
            }
          });
      }
}
