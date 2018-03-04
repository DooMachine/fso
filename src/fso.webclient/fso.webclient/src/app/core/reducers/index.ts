import { LayoutActionTypes, LayoutActions } from '../actions';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export enum ThemeColor{
  Red="Red_Theme",
  Pink="Pink_Theme",
  Purple="Purple_Theme",
  Deep_Purple ="Deep_Purple_Theme",
  Indigo ="Indigo_Theme",
  Blue ="Blue_Theme",
  Light_Blue="Light_Blue_Theme",
  Cyan ="Cyan_Theme",
  Teal="Teal_Theme",
  Green ="Green_Theme",
  Light_Green="Light_Green_Theme",
  Lime ="Lime_Theme",
  Yellow="Yellow_Theme",
  Amber="Amber_Theme",
  Orange="Orange_Theme",
  Deep_Orange="Deep_Orange_Theme",
  Brown="Brown_Theme",
  Grey="Grey_Theme",
  Blue_Grey="Blue_Grey_Theme",
  Black="Black_Theme"
}

export enum NavbarMode {
  Stable= 'STABLE',
  Small = 'SMALL',
  Hidden = 'HIDDEN'
}
export enum ProgressBarState{
    Hidden,
    Visible
}

export interface State {
  showSidenav: boolean;
  showSearchInput: boolean;
  isDarkTheme:boolean;
  navbarMode: NavbarMode;
  navbarFixed: boolean;
  themeClass: ThemeColor;
  navbarTextColor: string;
  progressBarMode: ProgressBarState;
}

const initialState: State = {
  showSidenav: false,
  showSearchInput:false,
  navbarMode: NavbarMode.Stable,
  isDarkTheme:false,
  navbarFixed: true,
  themeClass: ThemeColor.Pink,
  navbarTextColor : '#66757f;',
  progressBarMode: ProgressBarState.Hidden
};

export function reducer(
  state: State = initialState,
  action: LayoutActions
): State {
  switch (action.type) {
    case LayoutActionTypes.ToggleSearchInput:
      return {
        ...state,
        showSearchInput: !state.showSearchInput,
      };

    case LayoutActionTypes.CloseSidenav:
      return {
        ...state,
        showSidenav: false,
      };

    case LayoutActionTypes.OpenSidenav:
      return {
        ...state,
        showSidenav: true,
      };
    case LayoutActionTypes.HideProgressBar:
      return {
        ...state,
        progressBarMode:ProgressBarState.Hidden
      }
    case LayoutActionTypes.ShowProgressBar:
      return {
        ...state,
        progressBarMode:ProgressBarState.Visible
      }
    case LayoutActionTypes.NavbarToFixed:
      return {
        ...state,
        navbarFixed: true,
      };
    case LayoutActionTypes.NavbarToHidden:
      return {
        ...state,
        navbarMode: NavbarMode.Hidden,
      };
    case LayoutActionTypes.NavbarToSmall:
      return {
        ...state,
        navbarMode: NavbarMode.Small,
      };

    case LayoutActionTypes.NavbarToStable:
      return {
        ...state,
        navbarMode: NavbarMode.Stable,
      };
    case LayoutActionTypes.ChangeNavbarColor:
      return {
        ...state,
        themeClass: action.payload.color
      };
    case LayoutActionTypes.ChangeNavbarTextColor:
      return {
        ...state,
        navbarTextColor:action.payload.textColor
      }
      case LayoutActionTypes.ToggleThemeBase:{
        if(action.payload){
          return {...state,isDarkTheme:action.payload}
        }
      return{
        ...state,
        isDarkTheme:!state.isDarkTheme
      };
    }
    default:
      return state;
  }
}

export const getCoreState = createFeatureSelector<State>('layout');
export const selectThemeClass = createSelector(getCoreState,state=>state.themeClass);
export const getShowSidenav = createSelector(getCoreState,state=>state.showSidenav);
export const getNavbarMode = createSelector(getCoreState,state=>state.navbarMode);
export const selectIsDarkTheme = createSelector(getCoreState,state=>state.isDarkTheme);

