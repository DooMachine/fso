import { Action } from '@ngrx/store';
import { ThemeColor } from "../reducers/index";



export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav',
  NavbarToStable = '[Layout] Navbar Stable',
  NavbarToFixed = '[Layout] Navbar Stable',
  NavbarToSmall = '[Layout] Navbar To Small',
  NavbarToHidden = '[Layout] Navbar To Hidden',
  ChangeNavbarColor = '[Layout] Change Navbar Color',
  ChangeNavbarTextColor = '[Layout] Change Navbar Text Color',
  ShowProgressBar = '[Layout] Show Progress Bar',
  HideProgressBar = '[Layout] Hide Progress Bar',
  ToggleSearchInput = '[Layout] Toggle Search Input',

  ShowSnackBar = "[Layout] Show Snackbar",

  ToggleThemeBase ="[Layout] ToggleChange Theme Base"
}
export class ToggleSearchInputAction implements Action {
  readonly type = LayoutActionTypes.ToggleSearchInput;
}
export class ToggleThemeBase implements Action{
  readonly type = LayoutActionTypes.ToggleThemeBase;
  constructor(public payload?:any) {}
}
export class ShowSnackBarAction implements Action{
  readonly type = LayoutActionTypes.ShowSnackBar;
  constructor(public payload:{message:string,action:string,config?:any}) {}
}
export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CloseSidenav;
}
export class ShowProgressBar implements Action {
  readonly type = LayoutActionTypes.ShowProgressBar;
}

export class HideProgressBar implements Action {
  readonly type = LayoutActionTypes.HideProgressBar;
}
export class NavbarToStable implements Action {
  readonly type = LayoutActionTypes.NavbarToStable;
}

export class NavbarToFixed implements Action {
  readonly type = LayoutActionTypes.NavbarToFixed;
}
export class NavbarToSmall implements Action {
  readonly type = LayoutActionTypes.NavbarToSmall;
}

export class NavbarToHidden implements Action {
  readonly type = LayoutActionTypes.NavbarToHidden;
}
export class ChangeNavbarColor implements Action {
  readonly type = LayoutActionTypes.ChangeNavbarColor;
  constructor(public payload: {color: ThemeColor}) {}
}
export class ChangeNavbarTextColor implements Action {
  readonly type = LayoutActionTypes.ChangeNavbarTextColor;
  constructor(public payload: {textColor: ThemeColor}) {}
}
export type LayoutActions =
 OpenSidenav | CloseSidenav |
 ToggleSearchInputAction |
 ShowProgressBar | HideProgressBar
 |ShowSnackBarAction
 | NavbarToStable
 | NavbarToFixed
 | NavbarToSmall
 | NavbarToHidden
 | ChangeNavbarColor
 | ChangeNavbarTextColor
 | ToggleThemeBase;
