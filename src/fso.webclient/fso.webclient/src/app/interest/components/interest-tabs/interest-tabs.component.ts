import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-interest-tabs',
  templateUrl: './interest-tabs.component.html',
  styleUrls: ['./interest-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterestTabsComponent {
    tabLinks = [
      {label: '',  link: './', tooltip:"Home",icon:'home'},
      {label: 'Trends', link: 'trending', tooltip:"Trending posts",icon:'whatshot'},
      {label: 'Unreviewed', link: 'needreview', tooltip:"Posts need to reviewed",icon:'thumbs_up_down'},
      {label: 'Community', link: 'community', tooltip:"Community",icon:'people'},
    ];
  constructor() { }

}
