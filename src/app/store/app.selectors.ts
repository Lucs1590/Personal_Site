import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectIcons = createSelector(
  selectAppState,
  (state: AppState) => state.icons
);

export const selectMenuItems = createSelector(
  selectAppState,
  (state: AppState) => state.menuItems
);

export const selectFooterItems = createSelector(
  selectAppState,
  (state: AppState) => state.footerItems
);

export const selectRecommendations = createSelector(
  selectAppState,
  (state: AppState) => state.recommendations
);

export const selectTechnologies = createSelector(
  selectAppState,
  (state: AppState) => state.technologies
);

export const selectPublications = createSelector(
  selectAppState,
  (state: AppState) => state.publications
);

export const selectProjectDetails = createSelector(
  selectAppState,
  (state: AppState) => state.projectDetails
);

export const selectPortfolioItems = createSelector(
  selectAppState,
  (state: AppState) => state.portfolioItems
);

export const selectHomeData = createSelector(
  selectAppState,
  (state: AppState) => state.homeData
);

export const selectMobileHomeData = createSelector(
  selectAppState,
  (state: AppState) => state.mobileHomeData
);

export const selectAppData = createSelector(
  selectAppState,
  (state: AppState) => state.appData
);
