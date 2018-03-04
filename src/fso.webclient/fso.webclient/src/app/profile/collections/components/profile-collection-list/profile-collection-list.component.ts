import { Component, OnInit, Input ,ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import { CollectionCard } from '../../../../shared/models/collection/collectioncard';
import { environment } from '../../../../../environments/environment';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-profile-collection-list',
  templateUrl: './profile-collection-list.component.html',
  styleUrls: ['./profile-collection-list.component.scss']
})
export class ProfileCollectionListComponent implements OnInit {
  defaultCollectionThumbUrl:string = environment.placeHolderImages.collection;
  changeColId:number | null = null;
  changeForm:any;
  @Input() collections:CollectionCard[];
  @Input() isOwner:boolean;

  @Output() removeCollection = new EventEmitter();
  @Output() collectionDelete = new EventEmitter();
  @Output() updateColThumb = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  setChangeColId(collectionId: number){
    this.changeColId = collectionId;
  }

  continueColChange($event){
    var file = $event.target.files[0];
    if((this.IsFileImage(file.name))){
      this.changeForm = {collectionImage:file,collectionId:this.changeColId};
      this.updateColThumb.emit(this.changeForm)
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
