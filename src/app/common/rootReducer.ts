import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing, RouterState } from 'react-router-redux';
import { IStore } from 'models';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as auth } from '../auth/reducer';
import { reducer as summoner } from '../summoner/reducer';

const config = {
  storage,
  key: 'auth',
  blackList: ['isLoading', 'isApiChecked'],
};

export const rootReducer = combineReducers<IStore>({
  routing,
  summoner,
  auth: persistReducer(config, auth),
});

export default rootReducer;
