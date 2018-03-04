import { Action } from '@ngrx/store';


export const CHECK_USER_AUTH_STATE = '[User] Check User Auth State';
export const CHECK_USER_AUTH_STATE_SUCCESS = '[User] Check User Auth State Success';
export const GET_USER_INFO = '[User] Get User Info';
export const GET_USER_INFO_SUCCESS = '[User] Get User Info Success';
export const ATTEMPT_LOGIN  = '[User] Login';
export const ATTEMPT_LOGIN_SUCCESS  = '[User] Login Success';
export const ATTEMPT_LOGOUT  = '[User] Logout';
export const ATTEMPT_LOGOUT_SUCCESS  = '[User] Logout Success';
export const CALLBACK_AUTHORIZE_SUCCESS_ACTION = '[User] Callback Authorized Action';
export const CALLBACK_AUTHORIZE_FAIL_ACTION = '[User] Callback Authorize Fail Action';
export const ATTEMPT_CALLBACK_LOGIC_SUCCESS = '[User] Attempt Callback Logic Success';

export const TOKEN_EXPIRED_ACTION = '[User] TOKEN_EXPIRED_ACTION';

export class CheckUserAuthState implements Action {
    readonly type = CHECK_USER_AUTH_STATE;

    constructor(public payload ?:any) {
    }
}
export class CheckUserAuthStateSuccess implements Action {
    readonly type = CHECK_USER_AUTH_STATE_SUCCESS;

    constructor(public payload:{ isAuthenticated: boolean }) {
    }
}
export class CallbackAuthorizeSuccessAction implements Action {
    readonly type = CALLBACK_AUTHORIZE_SUCCESS_ACTION;

    constructor(public payload:{ isAuthenticated : boolean }) {
    }
}
export class CallbackAuthorizeFailAction implements Action {
    readonly type = CALLBACK_AUTHORIZE_FAIL_ACTION;

    constructor(public payload:{ isAuthenticated : boolean }) {
    }
}
export class GetUserInfo implements Action {
  readonly type = GET_USER_INFO;

  constructor(public payload ?: any) {
  }
}
export class GetUserInfoSuccess implements Action {
    readonly type = GET_USER_INFO_SUCCESS;
  
    constructor(public payload: {userData: any, isUserDataLoaded: boolean }) {
    }
}
export class AttemptLogin implements Action {
    readonly type = ATTEMPT_LOGIN;

    constructor(public payload ?: any) {
    }
}
export class AttemptLoginSuccess implements Action {
    readonly type = ATTEMPT_LOGIN_SUCCESS;

    constructor(public payload ?: any) {
    }
}
export class AttemptLogout implements Action {
    readonly type = ATTEMPT_LOGOUT;

    constructor(public payload ?: any) {
    }
}
export class AttemptLogoutSuccess implements Action {
    readonly type = ATTEMPT_LOGOUT_SUCCESS;

    constructor(public payload ?: any) {
    }
}
export class TokenExpiredAction implements Action {
    readonly type = TOKEN_EXPIRED_ACTION;

    constructor(public payload ?: any) {
    }
}
export type All =
 CheckUserAuthState |
 CheckUserAuthStateSuccess |
 CallbackAuthorizeSuccessAction |
 CallbackAuthorizeFailAction |
 GetUserInfo |
 GetUserInfoSuccess |
 AttemptLogin |
 AttemptLoginSuccess |
 AttemptLogout |
 AttemptLogoutSuccess |
 TokenExpiredAction ;

