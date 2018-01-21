import {
  summonerSearchRequest,
  summonerSearchSuccess,
  summonerSearchFailure,
  fetchMatchListRequest,
  fetchMatchListSuccess,
  fetchMatchListFailure,
  fetchSingleMatchRequest,
  fetchSingleMatchSuccess,
  fetchSingleMatchFailure,
  fetchLeagueRequest,
  fetchLeagueSuccess,
  fetchLeagueFailure,
} from './actions';
import { createReducer } from 'redux-act';
import { ISummonerInfo, IMatchList, ISingleMatch, ISummonerLeague } from 'models';
import { combineReducers } from 'redux';
import { F, T } from 'lodash/fp';

export interface ISummonerReducerState {
  isLoading: boolean;
  summonerInfo: ISummonerInfo | null;
  matchList: IMatchList | null;
  singleMatch: ISingleMatch | null;
  summonerLeague: ISummonerLeague[] | null;
}

const isLoading = createReducer<boolean>(on => {
  on(summonerSearchRequest, T);
  on(summonerSearchSuccess, F);
  on(summonerSearchFailure, F);

  on(fetchMatchListRequest, T);
  on(fetchMatchListSuccess, F);
  on(fetchMatchListFailure, F);

  on(fetchSingleMatchRequest, T);
  on(fetchSingleMatchSuccess, F);
  on(fetchSingleMatchFailure, F);

  on(fetchLeagueRequest, T);
  on(fetchLeagueSuccess, F);
  on(fetchLeagueFailure, F);
}, false);

const summonerInfo = createReducer<ISummonerInfo | null>(on => {
  on(summonerSearchSuccess, (state, summonerInfo: ISummonerInfo) => summonerInfo);
}, null);

const matchList = createReducer<IMatchList | null>(on => {
  on(fetchMatchListSuccess, (state, matchList: IMatchList) => matchList);
}, null);

const singleMatch = createReducer<ISingleMatch | null>(on => {
  on(fetchSingleMatchSuccess, (state, singleMatch: ISingleMatch) => singleMatch);
}, null);

const summonerLeague = createReducer<ISummonerLeague | null>(on => {
  on(fetchLeagueSuccess, (state, summonerLeague: ISummonerLeague) => summonerLeague);
}, null);

export const reducer = combineReducers<ISummonerReducerState>({
  summonerInfo,
  matchList,
  singleMatch,
  summonerLeague,
  isLoading,
});
