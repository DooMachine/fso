import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.scss']
})
export class AddNewCollectionComponent implements OnInit {
  form: FormGroup;
  nameCtrl:FormControl;
  descriptionCtrl:FormControl;
  @Output() submitCollection = new EventEmitter();
  @Input() collectionFormError :string|null;
  
  @Input()
  set collectionFormPending(value:boolean){
    if(value){
      this.form.disable();
    }else{
      this.form.enable();
    }
  }
  constructor(
    private formBuilder: FormBuilder
  ) 
  {
    this.nameCtrl = this.formBuilder.control('', [Validators.minLength(2), Validators.maxLength(100)]);
    
    this.descriptionCtrl = this.formBuilder.control('', [Validators.maxLength(512)]);
    
    this.form = this.formBuilder.group({
      name: this.nameCtrl,
      description:this.descriptionCtrl
    });
    this.form.setValue({'name':'','description':''});
  }
  ngOnInit() {
  }
  submit($event){
    if(this.form.valid){
      this.submitCollection.emit(this.form.value);
      this.form.setValue({'name':''});
    }
  }

}
