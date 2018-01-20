import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { IStore } from 'models';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as auth } from '../auth/reducer';
import { reducer as summoner } from '../summoner/reducer';
import { reducer as itemset } from '../itemset/reducer';
import { reducer as rune } from '../rune/reducer';
import { reducer as options } from '../options/reducer';

const authConfig = {
  storage,
  key: 'auth',
  blackList: ['isLoading', 'isApiChecked'],
};

const optionsConfig = {
  storage,
  key: 'options',
  blackList: ['isLoading', 'isVisible'],
};

export const rootReducer = combineReducers<IStore>({
  routing,
  summoner,
  rune,
  itemset, // TODO: Configure persist after feature is finished
  options: persistReducer(optionsConfig, options),
  auth: persistReducer(authConfig, auth),
});

export default rootReducer;
