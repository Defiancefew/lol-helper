import { keyCheckRequest, keyCheckSuccess, keyCheckFailure, keyLogout } from './actions';
import { createReducer } from 'redux-act';

export interface IApiReducer {
  apiKey: string;
  isLoading: boolean;
  isApiChecked: boolean;
}

export const initialState: IApiReducer = {
  apiKey: '',
  isLoading: false,
  isApiChecked: false,
};

export const reducer = createReducer<IApiReducer>(on => {
  on(keyCheckRequest, state => ({
    ...state,
    isLoading: true,
  }));

  on(keyCheckSuccess, (state, apiKey) => ({
    ...state,
    apiKey,
    isLoading: false,
    isApiChecked: true,
  }));

  on(keyCheckFailure, state => ({
    ...state,
    isLoading: false,
    isApiChecked: false,
  }));

  on(keyLogout, state => ({
    ...state,
    apiKey: '',
  }));
}, initialState);
