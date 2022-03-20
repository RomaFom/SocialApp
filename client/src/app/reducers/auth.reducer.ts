import { createReducer, on } from '@ngrx/store';
import { login } from '../actions/auth.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const initialState = {
    id: null,
    user: null,
    isLoggedIn: false,
    token: null,
}

const _authReducer = createReducer(
  initialState,
  on(login, (state,{payload}) => {
   
    console.log(payload)
    return {
      ...state,
      isLoggedIn: true
    }
  }),
  
);

export function authReducer(state:any, action:any) {
  return _authReducer(state, action);
}