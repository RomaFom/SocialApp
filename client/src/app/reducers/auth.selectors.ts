import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './auth.reducer';

export const getUserState = createFeatureSelector<State>('user');

export const getUser = createSelector(
  getUserState,
  (state: State) => state.user
);
