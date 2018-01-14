import { createReducer } from 'redux-act';
import { toggleModal, toggleOption } from './actions';

export interface IOptionState {
  initKeyCheck: boolean;
  isLoading: boolean;
  isVisible: boolean;
}

export const initialState: IOptionState = {
  initKeyCheck: true,
  isLoading: false,
  isVisible: false,
};

export const reducer = createReducer<IOptionState>(on => {
  on(toggleModal, (state, value) => ({
    ...state,
    isVisible: value ? value : !state.isVisible,
  }));

  on(toggleOption, (state, { name, value }) => ({
    ...state,
    [name]: value,
  }));
}, initialState);
