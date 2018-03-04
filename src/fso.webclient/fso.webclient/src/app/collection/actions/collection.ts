import { Action } from '@ngrx/store';


export enum CollectionActionTypes {
    GET_COLLECTION = '[Collection] GET_COLLECTION',
    GET_COLLECTION_SUCCESS = '[Collection] GET_COLLECTION_SUCCESS',
    GET_COLLECTION_FAIL = '[Collection] GET_COLLECTION_FAIL',

    FOLLOW_USER = '[Collection] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[Collection] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[Collection] FOLLOW_USER_FAIL',

    UNFOLLOW_USER = '[Collection] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[Collection] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[Collection] UNFOLLOW_USER_FAIL',
}


export class GetCollection implements Action {
    readonly type = CollectionActionTypes.GET_COLLECTION;

    constructor(public payload?: any) { }
}

export class GetCollectionSuccess implements Action {
    readonly type = CollectionActionTypes.GET_COLLECTION_SUCCESS;

    constructor(public payload: any) { }
}
export class GetCollectionFail implements Action {
    readonly type = CollectionActionTypes.GET_COLLECTION_FAIL;

    constructor(public payload: any) { }
}


export class FollowUserAction implements Action {
    readonly type = CollectionActionTypes.FOLLOW_USER;

    constructor(public payload:any) { }
}

export class FollowUserSuccessAction implements Action {
    readonly type = CollectionActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFailAction implements Action {
    readonly type = CollectionActionTypes.FOLLOW_USER_FAIL;
    constructor(public payload: any) {}
}
export class UnfollowUserAction implements Action {
    readonly type = CollectionActionTypes.UNFOLLOW_USER;

    constructor(public payload:any) { }
}

export class UnfollowUserSuccessAction implements Action {
    readonly type = CollectionActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFailAction implements Action {
    readonly type = CollectionActionTypes.UNFOLLOW_USER_FAIL;
    constructor(public payload: any) {}
}

export type CollectionActions
                        = GetCollection
                        | GetCollectionSuccess
                        | GetCollectionFail
                        | FollowUserAction
                        | FollowUserSuccessAction
                        | FollowUserFailAction
                        | UnfollowUserAction
                        | UnfollowUserSuccessAction
                        | UnfollowUserFailAction;
