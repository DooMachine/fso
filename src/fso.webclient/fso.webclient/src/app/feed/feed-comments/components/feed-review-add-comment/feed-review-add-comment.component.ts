

import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { FormGroup, FormBuilder , FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-feed-review-addcomment',
  templateUrl: './feed-review-add-comment.component.html',
  styleUrls: ['./feed-review-add-comment.component.scss']
})
export class FeedReviewAddCommentComponent implements OnInit {
  form: FormGroup;
  contentCtrl:FormControl;
  @Output() submitComment = new EventEmitter();
  @Output() closeCommentForm = new EventEmitter();
  @Input() commentFormError :string|null;
  @Input() authUsername:string;
  @Input() authUserProfileImage: string;
  @Input()
  set commentFormPending(value:boolean){
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
    this.form.setValue({'content':''});
  }


  ngOnInit() {
  }
  submit($event){
    if(this.form.valid){
      this.submitComment.emit(this.form.value);
    }
  }

}

