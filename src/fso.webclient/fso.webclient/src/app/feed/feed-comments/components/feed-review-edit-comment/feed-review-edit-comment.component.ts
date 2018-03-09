

import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { FormGroup, FormBuilder , FormControl,Validators} from '@angular/forms';
import { ReviewComment } from '../../../../post/models/reviewComment';

@Component({
  selector: 'app-feed-review-edit-comment',
  templateUrl: './feed-review-edit-comment.component.html',
  styleUrls: ['./feed-review-edit-comment.component.scss']
})
export class FeedReviewEditCommentComponent implements OnInit {
  form: FormGroup; 
  @Input() 
  set comment(com:ReviewComment){
    this.form.patchValue({'content': com.content });
  }
  contentCtrl:FormControl;
  @Output() submitEdit = new EventEmitter();
  @Output() closeCommentEditForm = new EventEmitter();
  
  @Input() commentEditFormError :string|null;
  @Input() authUsername:string;
  @Input() authUserProfileImage: string;
  @Input()
  set commentEditFormPending(value:boolean){
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
    this.contentCtrl = this.formBuilder.control('', [Validators.minLength(2),Validators.required, Validators.maxLength(1024)]);
    
    this.form = this.formBuilder.group({
      content: this.contentCtrl,
    });
  }


  ngOnInit() {
  }
  submit($event){
    if(this.form.valid){
      this.submitEdit.emit(this.form.value);
    }
  }

}

