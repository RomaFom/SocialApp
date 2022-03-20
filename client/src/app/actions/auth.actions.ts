import { createAction,props } from '@ngrx/store';

export const login = createAction('[Auth Component] Login',props<{ payload: any }>());