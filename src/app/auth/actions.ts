import { axios, shardDataUrl } from 'utils';
import { AxiosResponse, AxiosError } from 'axios';
import { createAction } from 'redux-act';
import { push } from 'react-router-redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IStore } from 'models';
import _ from 'lodash';
import { notification } from 'antd';

const NS = '@@AUTH/';

export const keyCheckRequest = createAction(`${NS}KEY CHECK REQUEST`);
export const keyCheckSuccess = createAction(`${NS}KEY CHECK SUCCESS`, (apiKey: string) => apiKey);
export const keyCheckFailure = createAction(`${NS}KEY CHECK FAILURE`, (err: AxiosError) => err);

export const keyLogout = createAction(`${NS}KEY LOGOUT`);

export const checkKey = (apiKey: string): ThunkAction<Promise<Action>, IStore, void> => (dispatch, getState) => {
  const previousLocation = _.get(getState(), 'routing.location.pathname', '/');
  dispatch(keyCheckRequest());

  return axios({
    method: 'GET',
    url: shardDataUrl,
    headers: {
      'X-Riot-Token': apiKey,
    },
  })
    .then((resp: AxiosResponse) => {
      if (resp.status === 200) {
        axios.defaults.headers.common['X-Riot-Token'] = apiKey;
        notification.success({
          message: 'Auth Successfull',
          description: '',
        });
        dispatch(push(previousLocation));
        return dispatch(keyCheckSuccess(apiKey));
      }

      return dispatch(push('/keycheck'));
    })
    .catch((err: AxiosError) => dispatch(keyCheckFailure(err)));
};
