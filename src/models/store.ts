import { RouterState } from 'react-router-redux';
import { IApiReducer } from '../app/auth/reducer';

export interface IStore {
  routing: RouterState;
  auth: IApiReducer;
}
