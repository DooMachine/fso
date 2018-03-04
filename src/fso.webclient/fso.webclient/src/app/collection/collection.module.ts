import { NgModule, ModuleWithProviders } from '@angular/core';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material';
import { CollectionComponent } from './containers/collection.container';
import { PostCollectionEffects } from './effects/collection';
import { metaReducer, reducers } from './reducers';
import { CollectionService } from './services/collection.service';
import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';
import { CollectionPostListComponent } from './components/collection-post-list/collection-post-list.component';

const COMPONENTS = [
    CollectionComponent,
    CollectionDetailComponent,
    CollectionPostListComponent
];
declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: "pan-x pan-y",      
    });
    return mc;
  }
}

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        StoreModule.forFeature('collection', reducers, {metaReducers: metaReducer}),
        EffectsModule.forFeature([PostCollectionEffects]),
        RouterModule.forChild([
            { path: '', component: CollectionComponent , pathMatch: 'full'},
            { path: ':id', component: CollectionComponent }
        ]),
      ],
      declarations: COMPONENTS,
      exports: COMPONENTS,
      providers: [CollectionService, 
        { 
        provide: HAMMER_GESTURE_CONFIG, 
        useClass: MyHammerConfig 
        }]
})
export class CollectionModule {}
