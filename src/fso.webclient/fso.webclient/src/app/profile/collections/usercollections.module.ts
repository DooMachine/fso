import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { CollectionEffects } from './effects/collection';

import { reducers, metaReducer } from './reducers';
import { UserCollectionService } from './services/user.collection.service';
import { UserCollectionsComponent } from './containers/user-collections.container';
import { ProfileCollectionListComponent } from './components/profile-collection-list/profile-collection-list.component';
import { AddNewCollectionComponent } from './components/add-collection/add-collection.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/index';
import { SharedModule } from '../../shared/shared.module';


const ROUTES = [
    { path: '', component: UserCollectionsComponent }    
];

const COMPONENTS = [
    UserCollectionsComponent,
    AddNewCollectionComponent,
    ProfileCollectionListComponent
];

const EFFECTS = [
    CollectionEffects,
];

const PROVIDERS = [
    UserCollectionService,
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        RouterModule,
        SharedModule,
        StoreModule.forFeature('usercollections', reducers,{metaReducers: metaReducer}),
        EffectsModule.forFeature(EFFECTS),
        RouterModule.forChild(ROUTES),
      ],
      declarations: COMPONENTS,
      exports: COMPONENTS,
      providers: PROVIDERS
})
export class UserCollectionsModule {}
