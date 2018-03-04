import { Component, OnInit, Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-nothing-to-show',
  templateUrl: './nothing-to-show.component.html',
  styleUrls: ['./nothing-to-show.component.scss']
})
export class NothingToShowComponent implements OnInit {
  @Input() icon:string = 'panorama_wide_angle';
  constructor() { }

  ngOnInit() {
  }

}
