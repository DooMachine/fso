import { Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatMenuTrigger } from '@angular/material';
import { SEOService } from '../../shared/services/seo.service';
import { State } from '../../reducers';
import { getIsAuthenticated } from '../../auth/reducers/auth.reducer';
import { GetFeedAction } from '../actions/activityfeed';
import { AttemptLogin } from '../../auth/actions/auth.actions';

@Component({
    selector: 'app-home-noauth',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:
        `
            <h1>Welcome to feasion</h1>
            <span>Start your fashion adventure!!</span>
            <small>FEASION is in debug mode! Your data may deleted in future</small>
            <b>Login now</b>
            <button
            mat-stroked-button
            color="primary"
            (click)="login()"
            >Login</button>
            
        `,
    styles: [``]
})
export class HomeNoAuthComponent implements OnInit {

    constructor(private store: Store<State>) {
    }
    ngOnInit() {        
    }

    login(){
        this.store.dispatch( new AttemptLogin());
    }
}
