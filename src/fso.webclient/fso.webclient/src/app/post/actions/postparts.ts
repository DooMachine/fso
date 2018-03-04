import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PostIndexPostPartsActionTypes {
    SET_POSTPARTS = '[PostIndexPostParts] SET_POSTPARTS',

    DECREASE_ACTIVE_POSTPART_INDEX = '[Post] DECREASE_ACTIVE_POSTPART_INDEX',
    INCREASE_ACTIVE_POSTPART_INDEX = '[Post] INCREASE_ACTIVE_POSTPART_INDEX',

    CHANGE_POSTPART_VIEW_STYLE = '[Post] CHANGE_POSTPART_VIEW_STYLE',
    CHANGE_ACTIVE_POSTPART_INDEX = '[Post] CHANGE_ACTIVE_POSTPART_INDEX',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class SetPostParts implements Action {
    readonly type = PostIndexPostPartsActionTypes.SET_POSTPARTS;

    constructor(public payload: any) { }
}

export class DecreaseActivePostPartIndex implements Action {
    readonly type = PostIndexPostPartsActionTypes.DECREASE_ACTIVE_POSTPART_INDEX;

    constructor() { }
}
export class IncreaseActivePostPartIndex implements Action {
    readonly type = PostIndexPostPartsActionTypes.INCREASE_ACTIVE_POSTPART_INDEX;

    constructor() { }
}
export class ChangeViewStyle implements Action {
    readonly type = PostIndexPostPartsActionTypes.CHANGE_POSTPART_VIEW_STYLE;

    constructor(public payload: any) { }
}
export class ChangeActivePostPartId implements Action {
    readonly type = PostIndexPostPartsActionTypes.CHANGE_ACTIVE_POSTPART_INDEX;

    constructor(public payload: {id: number}) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PostIndexPostPartsActions
                        = SetPostParts
                        | DecreaseActivePostPartIndex
                        | IncreaseActivePostPartIndex
                        | ChangeViewStyle
                        | ChangeActivePostPartId;
