import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { InterestCard } from '../../../shared/models/interest/interestcard';
import { CollectionCard } from '../../../shared/models/collection/collectioncard';

@Component({
  selector: 'app-addpost-postdetail',
  templateUrl: './addpost-postdetail.component.html',
  styleUrls: ['./addpost-postdetail.component.scss']
})
export class AddpostPostdetailComponent implements OnInit {
  interestInput:string ='';
  form: any;
  maxInterestCount:6;
  @Input() formState: any;
  @Input() autoCompleteInterests:InterestCard[];
  @Output() onFormSubmit= new EventEmitter();
  @Output() ocInputChanged = new EventEmitter();
  @Output() ocInputSelected = new EventEmitter();
  @Output() onShowError = new EventEmitter();
  @Output() onRemoveSelectedInterest = new EventEmitter();
  @Input() isautoCompleteInterestsLoading: boolean;
  @Input() formError: null|string;
  @Input() selectedInterests: Array<InterestCard>;
  @Input() collectionsList: CollectionCard[];
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

  titleCtrl: FormControl;
  descriptionCtrl: FormControl;
  interestCtrl:FormControl;

  constructor(
    private formBuilder: FormBuilder) {
      this.titleCtrl = this.formBuilder.control('',[Validators.required, Validators.maxLength(64)]);
      this.descriptionCtrl = this.formBuilder.control('', [Validators.minLength(2), Validators.maxLength(256)]);
      this.interestCtrl = this.formBuilder.control('');
      this.form = this.formBuilder.group({
        title: this.titleCtrl,
        interestInput: this.interestCtrl,
        description: this.descriptionCtrl,
        selectedPrivacySettings:[0,  [Validators.max(1)]],
        selectedInterestIds:[[],  []],
        selectedCollectionId: 0,
        id:0      
      });
      
     }

  ngOnInit() {
  }
  interestSelected($event){
    this.form.controls['interestInput'].setValue('');
    if(this.form.controls['selectedInterestIds'].value.length >= this.maxInterestCount){
      this.onShowError.emit('Maximum of '+ this.maxInterestCount+' four interests can be selected.');
      return false;
    }
    let newVal = $event.option.value;
    const prevVal = this.form.controls['selectedInterestIds'].value;
    if(prevVal.filter((interest) => interest === newVal).length > 0){
      this.onShowError.emit('You already selected it.');
      return false;
    }
    this.form.controls['selectedInterestIds'].setValue([...prevVal,newVal]);
    this.ocInputSelected.emit(newVal);
  }
  removeSelectetInterest($event){
    if(this.form.controls['selectedInterestIds'].value.length  < 1){
      this.onShowError.emit('At least 1 interest must be selected.');
    }
    const prevVal = this.form.controls['selectedInterestIds'].value;
    const nextVal = prevVal.filter((interestId) => { 
      return interestId !== $event
    });
    this.form.controls['selectedInterestIds'].setValue(nextVal);
    this.onRemoveSelectedInterest.emit($event);
  }
  interestInputChanged($event){
    
    const query = $event.target.value;    
    if (query === null ||query.match(/^ *$/) !== null) {
      return false;
    }
    this.ocInputChanged.emit(query);
  }
  submit($event){
    if(this.form.valid){
      this.onFormSubmit.emit(this.form.value);
    }    
  }
}

