import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth Component] Login',
  props<{ payload: any }>()
);
export const setToken = createAction(
  '[Auth Component] Auth',
  props<{ payload: any }>()
);
