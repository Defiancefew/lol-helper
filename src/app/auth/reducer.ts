import { keyCheckRequest, keyCheckSuccess, keyCheckFailure, keyLogout } from './actions';
import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import { F, T } from 'lodash/fp';

export interface IApiReducer {
  apiKey: string;
  isLoading: boolean;
  isApiChecked: boolean;
}

const isLoading = createReducer(on => {
  on(keyCheckRequest, T);
  on(keyCheckSuccess, F);
  on(keyCheckFailure, F);
}, false);

const apiKey = createReducer(on => {
  on(keyCheckSuccess, (state, apiKey) => apiKey);
  on(keyLogout, () => '');
}, '');

const isApiChecked = createReducer(on => {
  on(keyCheckSuccess, T);
  on(keyCheckFailure, F);
  on(keyLogout, F);
}, false);

export const reducer = combineReducers<IApiReducer>({ isLoading, apiKey, isApiChecked });
