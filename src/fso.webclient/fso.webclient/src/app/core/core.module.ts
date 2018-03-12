import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from '../material';

import { AppComponent } from './containers/appComponent/app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { SidenavComponent} from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NotificationModule } from '../notification/notification.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { SharedModule } from "../shared/shared.module";
import { SearchModule } from '../search/search.module';

export const COMPONENTS = [
    AppComponent,
    LayoutComponent,
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    ProgressBarComponent,
    BottomNavbarComponent
  ];
@NgModule({
    imports: [CommonModule,SharedModule, RouterModule, MaterialModule,SearchModule, NotificationModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    
})
export class CoreModule {
    static forRoot() {
        return {
          ngModule: CoreModule,
          providers: [],
        };
      }
}