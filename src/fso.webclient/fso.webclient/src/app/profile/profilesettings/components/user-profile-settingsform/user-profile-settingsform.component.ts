import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile-settingsform',
  templateUrl: './user-profile-settingsform.component.html',
  styleUrls: ['./user-profile-settingsform.component.scss']
})
export class UserProfileSettingsformComponent implements OnInit {
  @Input() formState: any;
  @Output() onFormSubmit= new EventEmitter();
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  form: any;
  followSetting =  [{
      value: 0,
      name: "Confirm All"
    },
    {
        value: 2,
        name: "Deny All"
    }];
  privacySettings =[{
      value:0,
      name:"Private"
  },
  {
      value:1,
      name:"Public"
  }];
  constructor(
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        name: ['', [Validators.minLength(2), Validators.maxLength(64)]],
        surname: ['',[Validators.minLength(2), Validators.maxLength(64)]],
        status: ['',  [Validators.maxLength(256)]],
        selectedFollowSettings:[0,  [Validators.max(2)]],
        selectedPrivacySettings:[0,  [Validators.max(1)]]           
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
