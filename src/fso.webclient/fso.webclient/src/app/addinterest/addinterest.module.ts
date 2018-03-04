import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/index';
import { SharedModule } from '../shared/shared.module';
import { AddNewInterestService } from './services/addnewinterest.service';
import { AddNewInterestEffects } from './effects/addnewinterest';
import { AddNewInterestContainer } from './containers/addnewinterest.container';
import { reducers ,metaReducer} from './reducers';
import { AddinterestInterestdetailComponent } from './components/addinterest-interestdetail/addinterest-interestdetail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const COMPONENTS = [
  AddNewInterestContainer,
  AddinterestInterestdetailComponent
];
export const EFFECTS = [
  AddNewInterestEffects
];
export const SERVICES = [
  AddNewInterestService
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('addnewinterest', reducers, {metaReducers:metaReducer}),
    EffectsModule.forFeature([AddNewInterestEffects]),
    RouterModule.forChild([
        { path: '', component: AddNewInterestContainer, pathMatch: 'full' },
    ]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [SERVICES]
})
export class AddNewInterestModule {}

