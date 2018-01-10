import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing, RouterState } from 'react-router-redux';
import { IStore } from 'models';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as auth } from '../auth/reducer';
import { reducer as summoner } from '../summoner/reducer';
import { reducer as itemset } from '../itemset/reducer';
import { reducer as rune } from '../rune/reducer';

const config = {
  storage,
  key: 'auth',
  blackList: ['isLoading', 'isApiChecked'],
};

export const rootReducer = combineReducers<IStore>({
  routing,
  summoner,
  rune,
  itemset, // TODO: Configure persist after feature is finished
  auth: persistReducer(config, auth),
});

export default rootReducer;
