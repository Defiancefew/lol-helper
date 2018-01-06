import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing, RouterState } from 'react-router-redux';
import { IStore } from 'models';
import { reducer as auth } from '../auth/reducer';

export const rootReducer = combineReducers<IStore>({
  routing,
  auth,
});

export default rootReducer;
