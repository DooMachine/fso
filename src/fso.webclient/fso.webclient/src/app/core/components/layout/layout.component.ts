import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <mat-sidenav-container fullscreen>
      <ng-content></ng-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
    mat-sidenav-container {
      margin-top:56px;
      
      background: rgba(0, 0, 0, 0.01);
    }
    *, /deep/ * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `,
  ],
})
export class LayoutComponent {}