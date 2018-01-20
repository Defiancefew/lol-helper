import { axios, summonerSearch, matchUrl, leagueUrl, isDev } from 'utils';
import { AxiosResponse, AxiosError } from 'axios';
import { createAction } from 'redux-act';
import { push } from 'react-router-redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IStore, ISummonerLeague } from 'models';
import _ from 'lodash';
import { matchMock, singleMatch as singleMatchMock, leagueMock } from './__mocks__';

const NS = '@@SUMMONER/';

export const summonerSearchRequest = createAction(`${NS}SEARCH REQUEST`);
export const summonerSearchSuccess = createAction(`${NS}SEARCH SUCCESS`, summoner => summoner);
export const summonerSearchFailure = createAction(`${NS}SEARCH FAILURE`, (err: AxiosError) => err);

export const fetchMatchListRequest = createAction(`${NS}FETCH MATCH LIST REQUEST`);
export const fetchMatchListSuccess = createAction(`${NS}FETCH MATCH LIST SUCCESS`, matchList => matchList);
export const fetchMatchListFailure = createAction(`${NS}FETCH MATCH LIST FAILURE`, (err: AxiosError) => err);

export const fetchSingleMatchRequest = createAction(`${NS}FETCH SINGLE MATCH REQUEST`);
export const fetchSingleMatchSuccess = createAction(`${NS}FETCH SINGLE MATCH SUCCESS`, singleMatch => singleMatch);
export const fetchSingleMatchFailure = createAction(`${NS}FETCH SINGLE MATCH FAILURE`, (err: AxiosError) => err);

export const fetchLeagueRequest = createAction(`${NS}FETCH LEAGUE REQUEST`);
export const fetchLeagueSuccess = createAction(`${NS}FETCH LEAGUE SUCCESS`, (league: ISummonerLeague[]) => league);
export const fetchLeagueFailure = createAction(`${NS}FETCH LEAGUE FAILURE`, (err: AxiosError) => err);

export const clearSearch = createAction(`${NS}CLEAR SEARCH`);

export const fetchSummoner = (id: string, type = 'id', region = 'euw1'): ThunkAction<Promise<Action>, IStore, void> => (
  dispatch,
  getState,
) => {
  dispatch(summonerSearchRequest());

  return axios({
    method: 'GET',
    url: summonerSearch(id, type),
  })
    .then((resp: AxiosResponse) => {
      if (resp.status === 200) {
        dispatch(push(`/summoner/${resp.data.accountId}/${resp.data.id}`));
        return dispatch(summonerSearchSuccess(resp.data));
      }

      return Promise.reject('failed');
    })
    .catch((err: AxiosError) => dispatch(summonerSearchFailure(err)));
};
// TODO: Change typing after mock will be removed
export const fetchMatchList = (accountId: string, recent = false): ThunkAction<Promise<Action>, IStore, void> => (
  dispatch,
  getState,
) => {
  dispatch(fetchMatchListRequest());

  if (isDev) {
    _.delay(() => dispatch(fetchMatchListSuccess(matchMock)), 500);

    return Promise.resolve().then(() => {
      return;
    });
  }

  return axios({
    method: 'GET',
    url: matchUrl.matchLists(accountId, recent),
  })
    .then((resp: AxiosResponse) => {
      if (resp.status === 200) {
        return dispatch(fetchMatchListSuccess(resp.data));
      }

      return Promise.reject('failed');
    })
    .catch((err: AxiosError) => dispatch(fetchMatchListFailure(err)));
};

export const fetchSingleMatch = (matchId: string, recent = false): ThunkAction<Promise<Action>, IStore, void> => (
  dispatch,
  getState,
) => {
  dispatch(fetchSingleMatchRequest());

  if (isDev) {
    _.delay(() => dispatch(fetchSingleMatchSuccess(singleMatchMock)), 500);

    return Promise.resolve().then(() => {
      return;
    });
  }

  return axios({
    method: 'GET',
    url: matchUrl.byMatchId(matchId),
  })
    .then((resp: AxiosResponse) => {
      if (resp.status === 200) {
        return dispatch(fetchSingleMatchSuccess(resp.data));
      }

      return Promise.reject('failed');
    })
    .catch((err: AxiosError) => dispatch(fetchSingleMatchFailure(err)));
};

export const fetchSummonerLeague = (summonerId: number): ThunkAction<Promise<Action>, IStore, void> => (
  dispatch,
  getState,
) => {
  dispatch(fetchLeagueRequest());

  if (isDev) {
    _.delay(() => dispatch(fetchLeagueSuccess(leagueMock)), 500);

    return Promise.resolve().then(() => {
      return;
    });
  }

  return axios({
    method: 'GET',
    url: leagueUrl.bySummonerId(summonerId),
  })
    .then((resp: AxiosResponse) => {
      if (resp.status === 200) {
        return dispatch(fetchLeagueSuccess(resp.data));
      }

      return Promise.reject('failed');
    })
    .catch((err: AxiosError) => dispatch(fetchLeagueFailure(err)));
};
