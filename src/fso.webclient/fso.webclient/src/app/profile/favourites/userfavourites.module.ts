import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { FavouriteEffects } from './effects/favourites';

import { reducers, metaReducer } from './reducers';
import { UserFavouriteService } from './services/user.favourites.service';

import { UserFavouritesComponent } from './containers/user-favourites.container';
import { UserFavouritesListComponent } from './components/user-favourites-list/user-favourites-list.component';
import { MaterialModule } from '../../material';
import { SharedModule } from '../../shared/shared.module';


const ROUTES = [
    { path: '', component: UserFavouritesComponent }    
];

const COMPONENTS = [
    UserFavouritesComponent,
    UserFavouritesListComponent
];

const EFFECTS = [
    FavouriteEffects,
];

const PROVIDERS = [
    UserFavouriteService,
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        StoreModule.forFeature('userfavourites', reducers,{metaReducers: metaReducer}),
        EffectsModule.forFeature(EFFECTS),
        RouterModule.forChild(ROUTES),
      ],
      declarations: COMPONENTS,
      exports: COMPONENTS,
      providers: PROVIDERS
})
export class UserFavouritesModule {}
