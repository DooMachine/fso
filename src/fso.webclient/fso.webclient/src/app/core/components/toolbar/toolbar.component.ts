import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
  
    <mat-toolbar 
    class='fixed-header'
     style="border-bottom:1px solid" [style.border-color]="color">
      <div class="home-wrapper-no-vertical-margin">
       <ng-content></ng-content>
      </div>
    </mat-toolbar>
  `,
  styles: ['mat-toolbar{height:56px; background:#fff; padding:0px 0px}']
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
  @Input() color: string;
  @Input() textColor: string;
}
