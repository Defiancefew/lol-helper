import { createReducer } from 'redux-act';
import { addRune, selectPrimary, selectSecondary, resetRune } from './actions';

export interface IRuneState {
  test: string;
}

export const initialState: IRuneState = {
  test: 'test',
};

export const reducer = createReducer<IRuneState>(on => {
  on(selectPrimary, state => ({
    ...state,
  }));

  on(resetRune, () => initialState);
}, initialState);
