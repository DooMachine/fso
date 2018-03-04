import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { PostEffects } from './effects/post';

import { reducers , metaReducer} from './reducers';
import { UserPostService } from './services/post.service';
import { UserPostComponent } from './containers/user-post.container';
import { SharedModule } from '../../shared/shared.module';
import { UserpostListComponentComponent } from './components/userpost-list-component/userpost-list-component.component';
import { MaterialModule } from "../../material/index";


const ROUTES = [
    { path: '', component: UserPostComponent }    
];

const COMPONENTS = [
    UserPostComponent,
    UserpostListComponentComponent
];

const EFFECTS = [
    PostEffects,
];

const PROVIDERS = [
    UserPostService,
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        StoreModule.forFeature('userposts', reducers),
        EffectsModule.forFeature(EFFECTS),
        RouterModule.forChild(ROUTES),
      ],
      declarations: COMPONENTS,
      exports: COMPONENTS,
      providers: PROVIDERS
})
export class UserPostsModule {}
