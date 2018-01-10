import { RouterState } from 'react-router-redux';
import { IApiReducer } from '../app/auth/reducer';
import { ISummonerReducerState } from '../app/summoner/reducer';
import { IItemSetState } from '../app/itemset/reducer';
import { IRuneState } from '../app/rune/reducer';

export interface IStore {
  routing: RouterState;
  auth: IApiReducer;
  summoner: ISummonerReducerState;
  itemset: IItemSetState;
  rune: IRuneState;
}
