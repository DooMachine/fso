import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { InterestCard } from '../../../shared/models/interest/interestcard';
import { CollectionCard } from '../../../shared/models/collection/collectioncard';

@Component({
  selector: 'app-addinterest-interestdetail',
  templateUrl: './addinterest-interestdetail.component.html',
  styleUrls: ['./addinterest-interestdetail.component.scss']
})
export class AddinterestInterestdetailComponent implements OnInit {
  interestInput:string ='';
  form: any;
  @Input() formState: any;
  @Output() onFormSubmit= new EventEmitter();
  @Output() onShowError = new EventEmitter();
  @Input() formError: null|string;
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  
  privacySettings =[{
      value:0,
      name:"Public"
  },
  {
      value:1,
      name:"Only Followers"
  }];

  nameCtrl: FormControl;
  aboutCtrl:FormControl;
  urlKeyCtrl:FormControl;
  descriptionCtrl: FormControl;
  colorAlphaCtrl:FormControl;

  constructor(
    private formBuilder: FormBuilder) {
      this.nameCtrl = this.formBuilder.control('',[Validators.required, Validators.maxLength(32)]);
      this.colorAlphaCtrl = this.formBuilder.control('',[Validators.required, Validators.maxLength(32)]);
      this.urlKeyCtrl = this.formBuilder.control('',[Validators.required, Validators.maxLength(32)]);
      this.descriptionCtrl = this.formBuilder.control('', [Validators.minLength(2), Validators.maxLength(256)]);
      this.aboutCtrl = this.formBuilder.control('', [Validators.minLength(2), Validators.maxLength(256)]);
      this.form = this.formBuilder.group({
        name: this.nameCtrl,
        about:this.aboutCtrl,
        colorAlpha:this.colorAlphaCtrl,
        urlKey:this.urlKeyCtrl,
        description: this.descriptionCtrl,
        id:0      
      });
      
     }

  ngOnInit() {
  }
  submit($event){
    if(this.form.valid){
      this.onFormSubmit.emit(this.form.value);
    }    
  }
}

