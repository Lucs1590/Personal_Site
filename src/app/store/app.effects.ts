import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  loadIcons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadIcons),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(icons => ({ type: '[Icon] Load Icons Success', icons })),
          catchError(() => of({ type: '[Icon] Load Icons Failure' }))
        )
      )
    )
  );

  loadMenuItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadMenuItems),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(menuItems => ({ type: '[Menu] Load Menu Items Success', menuItems })),
          catchError(() => of({ type: '[Menu] Load Menu Items Failure' }))
        )
      )
    )
  );

  loadFooterItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadFooterItems),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(footerItems => ({ type: '[Footer] Load Footer Items Success', footerItems })),
          catchError(() => of({ type: '[Footer] Load Footer Items Failure' }))
        )
      )
    )
  );

  loadRecommendations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadRecommendations),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(recommendations => ({ type: '[Recommendation] Load Recommendations Success', recommendations })),
          catchError(() => of({ type: '[Recommendation] Load Recommendations Failure' }))
        )
      )
    )
  );

  loadTechnologies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadTechnologies),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(technologies => ({ type: '[Technology] Load Technologies Success', technologies })),
          catchError(() => of({ type: '[Technology] Load Technologies Failure' }))
        )
      )
    )
  );

  loadPublications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadPublications),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(publications => ({ type: '[Publication] Load Publications Success', publications })),
          catchError(() => of({ type: '[Publication] Load Publications Failure' }))
        )
      )
    )
  );

  loadProjectDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadProjectDetails),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(projectDetails => ({ type: '[Project] Load Project Details Success', projectDetails })),
          catchError(() => of({ type: '[Project] Load Project Details Failure' }))
        )
      )
    )
  );

  loadPortfolioItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadPortfolioItems),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(portfolioItems => ({ type: '[Portfolio] Load Portfolio Items Success', portfolioItems })),
          catchError(() => of({ type: '[Portfolio] Load Portfolio Items Failure' }))
        )
      )
    )
  );

  loadHomeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadHomeData),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(homeData => ({ type: '[Home] Load Home Data Success', homeData })),
          catchError(() => of({ type: '[Home] Load Home Data Failure' }))
        )
      )
    )
  );

  loadMobileHomeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadMobileHomeData),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(mobileHomeData => ({ type: '[Mobile Home] Load Mobile Home Data Success', mobileHomeData })),
          catchError(() => of({ type: '[Mobile Home] Load Mobile Home Data Failure' }))
        )
      )
    )
  );

  loadAppData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadAppData),
      mergeMap(() =>
        this.apiService.getAllRepositories('Lucs1590').pipe(
          map(appData => ({ type: '[App] Load App Data Success', appData })),
          catchError(() => of({ type: '[App] Load App Data Failure' }))
        )
      )
    )
  );
}
