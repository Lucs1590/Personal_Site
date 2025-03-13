import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

export interface AppState {
  // Define the root state interface
  // Add properties for each feature state
}

export const initialState: AppState = {
  // Initialize the state properties
};

const appReducer = createReducer(
  initialState,
  on(AppActions.loadIcons, state => ({ ...state })),
  on(AppActions.loadMenuItems, state => ({ ...state })),
  on(AppActions.loadFooterItems, state => ({ ...state })),
  on(AppActions.loadRecommendations, state => ({ ...state })),
  on(AppActions.loadTechnologies, state => ({ ...state })),
  on(AppActions.loadPublications, state => ({ ...state })),
  on(AppActions.loadProjectDetails, state => ({ ...state })),
  on(AppActions.loadPortfolioItems, state => ({ ...state })),
  on(AppActions.loadHomeData, state => ({ ...state })),
  on(AppActions.loadMobileHomeData, state => ({ ...state })),
  on(AppActions.loadAppData, state => ({ ...state }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
