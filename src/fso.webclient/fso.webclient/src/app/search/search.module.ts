import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SearchNavComponent } from "./containers/search-nav/search-nav.component";
import { SearchService } from "./services/search.service";
import { MaterialModule } from '../material';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    //StoreModule.forFeature('Search', reducers),
    //EffectsModule.forFeature([SearchEffects]),
    RouterModule.forChild([
      { path: 'search', component: SearchNavComponent, pathMatch: 'full' },
    ]),
  ],
  declarations: [SearchNavComponent],
  exports:[SearchNavComponent],
  providers: [SearchService]
})
export class SearchModule { }
