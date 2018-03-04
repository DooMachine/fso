import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTabComponent implements OnInit {
    tabLinks = [
      {label: 'Feed', link: './'},
      {label: 'Posts', link: 'posts'},
      {label: 'Reviews', link: 'reviews'}, 
      {label: 'Favourites', link: 'favourites'},
      {label: 'Collections', link: 'collections'}    
    ];
  constructor() { }

  ngOnInit() {
  }

}
