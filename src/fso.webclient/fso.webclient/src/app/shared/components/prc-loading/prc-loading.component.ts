import { Component, OnInit,Input ,ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-prc-loading',
  templateUrl: './prc-loading.component.html',
  styleUrls: ['./prc-loading.component.scss']
})
export class PrcLoadingComponent implements OnInit {
  @Input() count:number;
  constructor() { }

  ngOnInit() {
  }

}
