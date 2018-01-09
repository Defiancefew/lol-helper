import { RouterState } from 'react-router-redux';
import { IApiReducer } from '../app/auth/reducer';
import { ISummonerReducerState } from '../app/summoner/reducer';

export interface IStore {
  routing: RouterState;
  auth: IApiReducer;
  summoner: ISummonerReducerState;
}
