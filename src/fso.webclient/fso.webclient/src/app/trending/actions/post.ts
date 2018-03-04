import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum TrendingPostActionTypes {
    GET_TRENDING_POSTS = '[Trending Post] GET_TRENDING_POSTS',
    GET_TRENDING_POSTS_SUCCESS = '[Trending Post] GET_TRENDING_POSTS_SUCCESS',
    GET_TRENDING_POSTS_FAIL = '[Trending Post] GET_TRENDING_POSTS_FAIL',

    LIKE_POST = '[Trending Post] LIKE_POST',
    LIKE_POST_SUCCESS = '[Trending Post] LIKE_POST_SUCCESS',
    LIKE_POST_FAIL = '[Trending Post] LIKE_POST_FAIL',

    UNLIKE_POST = '[Trending Post] UNLIKE_POST',
    UNLIKE_POST_SUCCESS = '[Trending Post] UNLIKE_POST_SUCCESS',
    UNLIKE_POST_FAIL = '[Trending Post] UNLIKE_POST_FAIL',

    FOLLOW_USER  = '[Trending Post] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[Trending Post] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[Trending Post] FOLLOW_USER_FAIL',

    UNFOLLOW_USER  = '[Trending Post] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[Trending Post] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[Trending Post] UNFOLLOW_USER_FAIL',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class GetTrendingPosts implements Action {
    readonly type = TrendingPostActionTypes.GET_TRENDING_POSTS;

    constructor(public payload?: any) { }
}

export class GetTrendingPostsSuccess implements Action {
    readonly type = TrendingPostActionTypes.GET_TRENDING_POSTS_SUCCESS;

    constructor(public payload?: any) { }
}
export class GetTrendingPostsFail implements Action {
    readonly type = TrendingPostActionTypes.GET_TRENDING_POSTS_FAIL;

    constructor(public payload?: any) { }
}

export class LikeInterestPostAction implements Action {
    readonly type = TrendingPostActionTypes.LIKE_POST;

    constructor(public payload:any) { }
}

export class LikePostSuccessAction implements Action {
    readonly type = TrendingPostActionTypes.LIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class LikePostFailAction implements Action {
    readonly type = TrendingPostActionTypes.LIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class UnLikeInterestPostAction implements Action {
    readonly type = TrendingPostActionTypes.UNLIKE_POST;

    constructor(public payload:any) { }
}

export class UnLikePostSuccessAction implements Action {
    readonly type = TrendingPostActionTypes.UNLIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikePostFailAction implements Action {
    readonly type = TrendingPostActionTypes.UNLIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class FollowUser implements Action {
    readonly type = TrendingPostActionTypes.FOLLOW_USER;

    constructor(public payload:any) { }
}

export class FollowUserSuccess implements Action {
    readonly type = TrendingPostActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFail implements Action {
    readonly type = TrendingPostActionTypes.FOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
export class UnfollowUser implements Action {
    readonly type = TrendingPostActionTypes.UNFOLLOW_USER;

    constructor(public payload:any) { }
}

export class UnfollowUserSuccess implements Action {
    readonly type = TrendingPostActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFail implements Action {
    readonly type = TrendingPostActionTypes.UNFOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TrendingPostActions
                        = GetTrendingPosts
                        | GetTrendingPostsSuccess
                        | GetTrendingPostsFail
                        | LikeInterestPostAction | 
                        LikePostSuccessAction |
                        LikePostFailAction |
                        UnLikeInterestPostAction | 
                        UnLikePostSuccessAction | 
                        UnLikePostFailAction
                        | FollowUser
                        | FollowUserSuccess
                        | FollowUserFail
                        | UnfollowUser
                        | UnfollowUserSuccess
                        | UnfollowUserFail;
