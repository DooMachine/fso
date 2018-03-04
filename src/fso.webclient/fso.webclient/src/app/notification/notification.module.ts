import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavNotificationContainer } from './containers/nav-notification.container';
import { NavNotificationListComponent } from './components/nav-notificationlist/nav-notificationlist.component';
import { NavNotificationitemComponent } from './components/nav-notificationitem/nav-notificationitem.component';
import { NotificationComponent } from './containers/notification.container';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NotificationService } from './services/notification.service';
import { MaterialModule } from '../material/index';
import { reducer } from './reducers';
import { NotificationEffects } from './effects/NotificationCollection';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SharedModule } from '../shared/shared.module';

export const COMPONENTS = [
    NavNotificationContainer,
    NotificationListComponent,
    NavNotificationListComponent,
    NavNotificationitemComponent,
    NotificationComponent,
    NotificationItemComponent
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
      { path : 'notifications' , canActivate: [AuthGuard], component: NotificationComponent }
  ])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class NotificationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootNotificationModule,
      providers: [NotificationService],
    };
  }
}

@NgModule({
  imports: [
    NotificationModule,
    StoreModule.forFeature('notification', reducer),
    EffectsModule.forFeature([NotificationEffects]),
  ],
})
export class RootNotificationModule {}
