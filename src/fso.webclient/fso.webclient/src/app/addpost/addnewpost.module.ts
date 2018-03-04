import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/index';
import { SharedModule } from '../shared/shared.module';
import { AddNewPostService } from './services/addnewpost.service';
import { AddNewPostEffects } from './effects/addnewpost';
import { AddNewPostContainer } from './containers/addnewpost.container';
import { reducers ,metaReducer} from './reducers';
import { StepperItemComponent } from './components/stepper-item/stepper-item.component';
import { AddpostStepperComponent } from './components/addpost-stepper/addpost-stepper.component';
import { AddpostPostpartsComponent } from './components/addpost-postparts/addpost-postparts.component';
import { PostPartImageService } from './services/postpartimage.service';
import { AddpostPostdetailComponent } from './components/addpost-postdetail/addpost-postdetail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const COMPONENTS = [
  AddNewPostContainer,
  StepperItemComponent,
  AddpostPostpartsComponent,
  AddpostStepperComponent,
  AddpostPostdetailComponent 
];
export const EFFECTS = [
  AddNewPostEffects
];
export const SERVICES = [
  AddNewPostService,
  PostPartImageService
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('addnewpost', reducers, {metaReducers:metaReducer}),
    EffectsModule.forFeature([AddNewPostEffects]),
    RouterModule.forChild([
        { path: '', component: AddNewPostContainer, pathMatch: 'full' },
    ]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [SERVICES]
})
export class AddNewPostModule {}

