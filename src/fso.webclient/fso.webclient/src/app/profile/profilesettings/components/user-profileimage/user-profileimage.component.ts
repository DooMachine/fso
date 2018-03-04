import { Component, OnInit, Input ,EventEmitter , Output, ElementRef, ViewChild} from '@angular/core';
import { State } from '../../reducers/profileimage';
import { environment } from '../../../../../environments/environment'
@Component({
  selector: 'app-user-profileimage',
  templateUrl: './user-profileimage.component.html',
  styleUrls: ['./user-profileimage.component.scss']
})
export class UserProfileimageComponent implements OnInit {
  @Input() profileImageState : State; 
  @Input() userId: string;
  @Output() onChangedInput = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  public fileChangeEvent($event){
    var file = $event.target.files[0];
    if((this.IsFileImage(file.name))){
      this.onChangedInput.emit(file);
    }    
  }
  private IsFileImage(fileName: string): boolean {
    const okayImageExtensions = ["jpg","jpeg","png","gif"]
    const sFileExtension = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
    const isOkay = okayImageExtensions.filter((extension) => extension === sFileExtension).length
    if (!isOkay){
        return false;
    }
    return true;
  }
}
