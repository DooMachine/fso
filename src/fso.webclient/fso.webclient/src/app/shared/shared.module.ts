import { PostCardComponent } from './components/postcard/postcard.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material';

import { EllipsisPipe } from './pipes/ellipsis';
import { PostcardPostpartComponent } from './components/postcard-postpart/postcard-postpart.component';
import { CookieService } from './services/cookie.service';
import { SEOService } from './services/seo.service';
import { PlatformService } from './services/platform.service';
import { NumFormatPipe } from './pipes/numformat';
import { PostcardReviewComponent } from './components/postcard-review/postcard-review.component';
import { RouterModule } from '@angular/router';
import { PostLikeService } from './services/postlike.service';
import { ReviewLikeService } from './services/reviewlike.service';
import { SanitizeHtmlPipe } from './pipes/sanitizehtml';
import { UsercardComponent } from './components/user/usercard/usercard.component';
import { RouterHelperService } from './services/routerhelper.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ConnectFormDirective } from './directives/connectform.directive';
import { NothingToShowComponent } from './components/nothing-to-show/nothing-to-show.component';
import { DefaultUserImageDirective } from './directives/defaultuserimage.directive';
import { UserFollowbuttonComponent } from './components/user-followbutton/user-followbutton.component';
import { UserFollowService } from './services/userfollow.service';
import { NewlinePipe } from './pipes/newline';
import { CommentService } from './services/comment.service';
import { PrcLoadingComponent } from './components/prc-loading/prc-loading.component';
import { LocalizationService } from './services/localization.service';
import { BreakPointService } from './services/breakpoint.service';
import { ModGuard } from '../auth/guards/mod.guard';
import { GroupFollowService } from './services/groupfollow.service';
import { PostCardSmallComponent } from './components/postcard-small/postcard-small.component';
import { PaginatedPostComponent } from './components/paginated-post/paginated-post.component';
import { ScrollService } from "./services/scroll.service";
import { InfiniteScrollDirective } from "./directives/infinitescroll.directive";
import { UtcDatePipe } from "./pipes/utctime";


const COMPONENTS = [
    PostCardComponent,
    PostcardPostpartComponent,
    PostcardReviewComponent,
    UsercardComponent,
    NothingToShowComponent,
    UserFollowbuttonComponent,
    PrcLoadingComponent,
    UserFollowbuttonComponent,
    PostCardSmallComponent,
    PaginatedPostComponent
];
const PIPES = [
    EllipsisPipe,
    NumFormatPipe,
    SanitizeHtmlPipe,
    UtcDatePipe,
    NewlinePipe
]
const DIRECTIVES = [
    ConnectFormDirective,
    DefaultUserImageDirective,
    InfiniteScrollDirective
]
const SERVICES = [
    CookieService,
    ScrollService,
    SEOService,
    PlatformService,
    PostLikeService,
    ReviewLikeService,
    CommentService,
    RouterHelperService,
    AuthGuard,
    ModGuard,
    UserFollowService,
    LocalizationService,
    BreakPointService,
    GroupFollowService
]
@NgModule({
    imports: [CommonModule,  MaterialModule, RouterModule
        ],
    providers:[SERVICES],
    declarations: [...COMPONENTS,PIPES,DIRECTIVES ],
    exports: [...DIRECTIVES,COMPONENTS,PIPES],
})
export class SharedModule {
    static forRoot() {
        return {
          ngModule: SharedModule,
          providers: [ SERVICES ]
        }
      }
}
