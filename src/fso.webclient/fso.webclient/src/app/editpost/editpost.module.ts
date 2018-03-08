import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/index';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostPartImageService } from './services/postpartimage.service';
import { EditPostService } from './services/editpost.service';
import { EditPostEffects } from './effects/editpost';
import { EditPostContainer } from './containers/editpost.container';
import { metaReducer, reducers } from './reducers';
import { EditPostPostpartsComponent } from './components/editpost-postparts/editpost-postparts.component';
import { EditPostPostdetailComponent } from './components/editpost-postdetail/editpost-postdetail.component';

export const COMPONENTS = [
  EditPostContainer,
  EditPostPostdetailComponent,
  EditPostPostpartsComponent
];

export const SERVICES = [
    PostPartImageService,
    EditPostService
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('editpost', reducers, {metaReducers:metaReducer}),
    EffectsModule.forFeature([EditPostEffects]),
    RouterModule.forChild([
        { path: '', component: EditPostContainer, pathMatch: 'full' },
    ]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [SERVICES]
})
export class EditPostModule {}

