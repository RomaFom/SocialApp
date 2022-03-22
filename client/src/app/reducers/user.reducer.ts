import { Action } from '@ngrx/store';

export function userReducer(state: string = 'hello', action: Action) {
  console.log(action.type);
  switch (action.type) {
    case 'LOGIN':
      return (state = 'login');
    case 'LOGOUT':
      return (state = 'logout');
    default:
      return state;
  }
}
