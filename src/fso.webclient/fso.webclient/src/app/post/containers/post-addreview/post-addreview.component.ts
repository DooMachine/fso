
import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State, getShowForm, getFormError } from '../../reducers/addreview';
import {SubmitForm } from '../../actions/addreview';
import { Observable } from 'rxjs/Observable';
import { selectUserName, selectUserProfileImage } from '../../../auth/reducers/auth.reducer';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ScrollService } from '../../../shared/services/scroll.service';

@Component({
  selector: 'app-post-addreview',
  templateUrl: './post-addreview.component.html',
  styleUrls: ['./post-addreview.component.scss']
})
export class PostAddreviewComponent implements OnInit , OnDestroy,AfterViewInit{
  @ViewChild('myname') fromWrapper:ElementRef;
  form: FormGroup;
  formState: any;
  formError$: Observable<null|string>;  
  isSmallScreen:boolean = false;
  pending:boolean;
  showForm$:Observable<boolean>;
  ratingCtrl: FormControl;
  contentCtrl: FormControl;
  authUsername$:Observable<string>;
  authUserProfileImage$: Observable<string>;

  constructor(
    private store: Store<State>,
    private breakpointObserver: BreakpointObserver,
    private scrollService:ScrollService,
    public element: ElementRef,
    private formBuilder: FormBuilder) {

      this.showForm$ = this.store.select(getShowForm);
      this.formError$ = this.store.select(getFormError);
      this.authUsername$ = this.store.select(selectUserName);
      this.authUserProfileImage$ = this.store.select(selectUserProfileImage);
      this.ratingCtrl = this.formBuilder.control(5, [Validators.min(1), Validators.max(10)]);
      this.contentCtrl = this.formBuilder.control('', [Validators.required,Validators.minLength(2), Validators.maxLength(10240)]);
      
      this.form = this.formBuilder.group({
        rating: this.ratingCtrl,
        content: this.contentCtrl,
      });

      this.form.setValue({'content':'','rating': 5});
     }

  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
  }
  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class. 
    setTimeout(() => {
      this.element.nativeElement.scrollIntoView({ behavior: "smooth",block:"start"});      
    }, 20);
  }
  onRatingSlideChange($event){
    this.form.setValue({'content': this.form.value.content,'rating': $event.value});
  }
  ngOnDestroy() {
    this.breakpointObserver.ngOnDestroy();
  }
  submit($event){
    if(this.form.valid){
      this.store.dispatch(new SubmitForm(this.form.value));
    }
  }
}

