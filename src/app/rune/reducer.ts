import { createReducer } from 'redux-act';
import _ from 'lodash';
import { addRune, removeRune, selectPrimary, selectSecondary, resetRune } from './actions';

export interface IRuneState {
  mainPath: number;
  secondaryPath: number;
  slots: {
    [key: number]: number;
  };
}

export const initialState: IRuneState = {
  mainPath: null,
  secondaryPath: null,
  slots: {},
};

export const reducer = createReducer<IRuneState>(on => {
  on(selectPrimary, (state, mainPath) => ({
    ...state,
    mainPath,
  }));

  on(selectSecondary, (state, secondaryPath) => ({
    ...state,
    secondaryPath,
    slots: _.omit(state.slots, ['4', '5']) as IRuneState['slots'],
  }));

  on(addRune, (state, { runeId, slotIdx }) => ({
    ...state,
    slots: {
      ...state.slots,
      [slotIdx]: runeId,
    },
  }));

  on(resetRune, () => initialState);
}, initialState);
