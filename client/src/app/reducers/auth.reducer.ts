import { createReducer, on } from '@ngrx/store';
import { login, setToken } from '../actions/auth.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const initialState = {
  id: null,
  user: null,
  email: null,
  isLoggedIn: false,
  token: null,
};

export interface State {
  id: number;
  user: string;
  email: string;
}

const _authReducer = createReducer(
  initialState,
  on(setToken, (state, { payload }) => ({
    ...state,
    token: payload,
  })),
  on(login, (state, { payload }) => ({
    ...state,
    id: payload.id,
    user: payload.name,
    email: payload.email,
    isLoggedIn: true,
  }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
