import {
  summonerSearchRequest,
  summonerSearchSuccess,
  summonerSearchFailure,
  clearSearch,
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
import { ISummonerInfo, IMatch, ISingleMatch, ISummonerLeague } from 'models';
import _ from 'lodash';

interface IMatchList {
  startIndex: number;
  endIndex: number;
  totalGames: number;
  matches: IMatch[];
}

export interface ISummonerReducerState {
  isLoading: boolean;
  summonerInfo: ISummonerInfo;
  searchHistory: ISummonerInfo[];
  matchList: IMatchList;
  singleMatch: ISingleMatch;
  summonerLeague: ISummonerLeague[];
}

export const initialState: ISummonerReducerState = {
  isLoading: false,
  summonerInfo: null,
  matchList: null,
  singleMatch: null,
  searchHistory: [],
  summonerLeague: null,
};

export const reducer = createReducer<ISummonerReducerState>(on => {
  on(summonerSearchRequest, state => ({
    ...state,
    isLoading: true,
  }));

  on(summonerSearchSuccess, (state, summonerInfo: ISummonerInfo) => ({
    ...state,
    summonerInfo,
    isLoading: false,
    searchHistory: _.uniqBy([...state.searchHistory, summonerInfo], 'id'),
  }));

  on(summonerSearchFailure, state => ({
    ...state,
    isLoading: false,
  }));

  on(fetchMatchListRequest, state => ({
    ...state,
    isLoading: true,
  }));

  on(fetchMatchListSuccess, (state, matchList: IMatchList) => ({
    ...state,
    matchList,
    isLoading: false,
  }));

  on(fetchMatchListFailure, state => ({
    ...state,
    isLoading: false,
  }));

  on(fetchSingleMatchRequest, state => ({
    ...state,
    isLoading: true,
  }));

  on(fetchSingleMatchSuccess, (state, singleMatch: ISingleMatch) => ({
    ...state,
    singleMatch,
    isLoading: false,
  }));

  on(fetchSingleMatchFailure, state => ({
    ...state,
    isLoading: false,
  }));

  on(fetchLeagueRequest, state => ({
    ...state,
    isLoading: true,
  }));

  on(fetchLeagueSuccess, (state, summonerLeague: ISummonerLeague[]) => ({
    ...state,
    summonerLeague,
    isLoading: false,
  }));

  on(fetchLeagueFailure, state => ({
    ...state,
    isLoading: false,
  }));

  on(clearSearch, state => ({
    ...state,
    searchHistory: [],
  }));
}, initialState);
