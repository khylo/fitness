import { Action } from "@ngrx/store";

/**
 * NGRx .. Redux for NG
 *
 }
 */
export interface State {
  isLoading: boolean;
}

export const UI_STATE_START_LOADING= '[UI] START LOADING';
export const UI_STATE_STOP_LOADING='[UI] STOP LOADING';

export class StartLoading implements Action {
  readonly type = UI_STATE_START_LOADING;
}

export class StopLoading implements Action {
  readonly type = UI_STATE_STOP_LOADING;
}

export type UIActions = StartLoading | StopLoading;

 const initialState: State = {
  isLoading: false
 }


export function uiReducer(state = initialState, action: UIActions) { // actions must have a type property
  switch (action.type) {
    case UI_STATE_START_LOADING:
      return { isLoading: true};
    case UI_STATE_STOP_LOADING:
      return { isLoading: false};
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;